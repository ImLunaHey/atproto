import { CID } from 'multiformats/cid'

import { BlobRef } from '@atproto/lexicon'
import { CommitData } from '@atproto/repo'
import { AtUri } from '@atproto/syntax'
import { AuthRequiredError, InvalidRequestError } from '@atproto/xrpc-server'

import { ActorStoreTransactor } from '../../../../actor-store'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { ids } from '../../../../lexicon/lexicons'
import { Record as ProfileRecord } from '../../../../lexicon/types/app/bsky/actor/profile'
import {
  BadCommitSwapError,
  BadRecordSwapError,
  InvalidRecordError,
  PreparedCreate,
  PreparedUpdate,
  prepareCreate,
  prepareUpdate,
} from '../../../../repo'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.repo.putRecord({
    auth: ctx.authVerifier.accessStandard({
      checkTakedown: true,
      checkDeactivated: true,
    }),
    rateLimit: [
      {
        name: 'repo-write-hour',
        calcKey: ({ auth }) => auth.credentials.did,
        calcPoints: () => 2,
      },
      {
        name: 'repo-write-day',
        calcKey: ({ auth }) => auth.credentials.did,
        calcPoints: () => 2,
      },
    ],
    handler: async ({ auth, input }) => {
      const {
        repo,
        collection,
        rkey,
        record,
        validate,
        swapCommit,
        swapRecord,
      } = input.body
      const account = await ctx.accountManager.getAccount(repo, {
        includeDeactivated: true,
      })

      if (!account) {
        throw new InvalidRequestError(`Could not find repo: ${repo}`)
      } else if (account.deactivatedAt) {
        throw new InvalidRequestError('Account is deactivated')
      }
      const did = account.did
      if (did !== auth.credentials.did) {
        throw new AuthRequiredError()
      }

      const uri = AtUri.make(did, collection, rkey)
      const swapCommitCid = swapCommit ? CID.parse(swapCommit) : undefined
      const swapRecordCid =
        typeof swapRecord === 'string' ? CID.parse(swapRecord) : swapRecord

      const { commit, write } = await ctx.actorStore.transact(
        did,
        async (actorTxn) => {
          const current = await actorTxn.record.getRecord(uri, null, true)
          const isUpdate = current !== null

          // @TODO temporaray hack for legacy blob refs in profiles - remove after migrating legacy blobs
          if (isUpdate && collection === ids.AppBskyActorProfile) {
            await updateProfileLegacyBlobRef(actorTxn, record)
          }
          const writeInfo = {
            did,
            collection,
            rkey,
            record,
            swapCid: swapRecordCid,
            validate,
          }

          let write: PreparedCreate | PreparedUpdate
          try {
            write = isUpdate
              ? await prepareUpdate(writeInfo)
              : await prepareCreate(writeInfo)
          } catch (err) {
            if (err instanceof InvalidRecordError) {
              throw new InvalidRequestError(err.message)
            }
            throw err
          }

          // no-op
          if (current && current.cid === write.cid.toString()) {
            return {
              commit: null,
              write,
            }
          }

          let commit: CommitData
          try {
            commit = await actorTxn.repo.processWrites([write], swapCommitCid)
          } catch (err) {
            if (
              err instanceof BadCommitSwapError ||
              err instanceof BadRecordSwapError
            ) {
              throw new InvalidRequestError(err.message, 'InvalidSwap')
            } else {
              throw err
            }
          }
          return { commit, write }
        },
      )

      if (commit !== null) {
        await ctx.sequencer.sequenceCommit(did, commit, [write])
        await ctx.accountManager.updateRepoRoot(did, commit.cid, commit.rev)
      }

      return {
        encoding: 'application/json',
        body: {
          uri: write.uri.toString(),
          cid: write.cid.toString(),
          commit: commit
            ? {
                cid: commit.cid.toString(),
                rev: commit.rev,
              }
            : undefined,
          validationStatus: write.validationStatus,
        },
      }
    },
  })
}

// WARNING: mutates object
const updateProfileLegacyBlobRef = async (
  actorStore: ActorStoreTransactor,
  record: ProfileRecord,
) => {
  if (record.avatar && !record.avatar.original['$type']) {
    const blob = await actorStore.repo.blob.getBlobMetadata(record.avatar.ref)
    record.avatar = new BlobRef(
      record.avatar.ref,
      record.avatar.mimeType,
      blob.size,
    )
  }
  if (record.banner && !record.banner.original['$type']) {
    const blob = await actorStore.repo.blob.getBlobMetadata(record.banner.ref)
    record.banner = new BlobRef(
      record.banner.ref,
      record.banner.mimeType,
      blob.size,
    )
  }
}
