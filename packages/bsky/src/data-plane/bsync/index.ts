import http from 'http'
import events from 'events'
import assert from 'assert'
import express from 'express'
import { ConnectRouter } from '@connectrpc/connect'
import { expressConnectMiddleware } from '@connectrpc/connect-express'
import { AtUri } from '@atproto/syntax'
import { Database } from '../server/db'
import { Service } from '../../proto/bsync_connect'
import { MuteOperation_Type } from '../../proto/bsync_pb'
import { ids } from '../../lexicon/lexicons'
import { Timestamp } from '@bufbuild/protobuf'

export class MockBsync {
  constructor(public server: http.Server) {}

  static async create(db: Database, port: number) {
    const app = express()
    const routes = createRoutes(db)
    app.use(expressConnectMiddleware({ routes }))
    const server = app.listen(port)
    await events.once(server, 'listening')
    return new MockBsync(server)
  }

  async destroy() {
    return new Promise<void>((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

const createRoutes = (db: Database) => (router: ConnectRouter) =>
  router.service(Service, {
    async addMuteOperation(req) {
      const { type, actorDid, subject } = req
      if (type === MuteOperation_Type.ADD) {
        if (subject.startsWith('did:')) {
          assert(actorDid !== subject, 'cannot mute yourself') // @TODO pass message through in http error
          await db.db
            .insertInto('mute')
            .values({
              mutedByDid: actorDid,
              subjectDid: subject,
              createdAt: new Date().toISOString(),
            })
            .onConflict((oc) => oc.doNothing())
            .execute()
        } else {
          const uri = new AtUri(subject)
          if (uri.collection === ids.AppBskyGraphList) {
            await db.db
              .insertInto('list_mute')
              .values({
                mutedByDid: actorDid,
                listUri: subject,
                createdAt: new Date().toISOString(),
              })
              .onConflict((oc) => oc.doNothing())
              .execute()
          } else {
            await db.db
              .insertInto('thread_mute')
              .values({
                mutedByDid: actorDid,
                rootUri: subject,
                createdAt: new Date().toISOString(),
              })
              .onConflict((oc) => oc.doNothing())
              .execute()
          }
        }
      } else if (type === MuteOperation_Type.REMOVE) {
        if (subject.startsWith('did:')) {
          await db.db
            .deleteFrom('mute')
            .where('mutedByDid', '=', actorDid)
            .where('subjectDid', '=', subject)
            .execute()
        } else {
          const uri = new AtUri(subject)
          if (uri.collection === ids.AppBskyGraphList) {
            await db.db
              .deleteFrom('list_mute')
              .where('mutedByDid', '=', actorDid)
              .where('listUri', '=', subject)
              .execute()
          } else {
            await db.db
              .deleteFrom('thread_mute')
              .where('mutedByDid', '=', actorDid)
              .where('rootUri', '=', subject)
              .execute()
          }
        }
      } else if (type === MuteOperation_Type.CLEAR) {
        await db.db
          .deleteFrom('mute')
          .where('mutedByDid', '=', actorDid)
          .execute()
        await db.db
          .deleteFrom('list_mute')
          .where('mutedByDid', '=', actorDid)
          .execute()
      }

      return {}
    },

    async scanMuteOperations() {
      throw new Error('not implemented')
    },

    async addNotifOperation(req) {
      const { actorDid, priority } = req
      if (priority !== undefined) {
        await db.db
          .insertInto('actor_state')
          .values({
            did: actorDid,
            priorityNotifs: priority,
            lastSeenNotifs: new Date().toISOString(),
          })
          .onConflict((oc) =>
            oc.column('did').doUpdateSet({ priorityNotifs: priority }),
          )
          .execute()
      }
      return {}
    },

    async scanNotifOperations() {
      throw new Error('not implemented')
    },

    async refreshPurchases(req) {
      const { actorDid } = req

      // Simulates that a call to the subscription service returns the 'core' entitlement.
      const entitlements = ['core']

      await db.db
        .insertInto('purchase')
        .values({
          did: actorDid,
          entitlements: JSON.stringify(entitlements),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .onConflict((oc) =>
          oc.column('did').doUpdateSet({
            entitlements: JSON.stringify(entitlements),
            updatedAt: new Date().toISOString(),
          }),
        )
        .execute()
    },

    async getSubscriptions() {
      const TEN_DAYS = 864_000_000
      const now = Date.now()
      const start = new Date(now - TEN_DAYS)
      const end = new Date(now + TEN_DAYS)

      // Simulates that a call to the subscription service returns this subscription.
      return {
        email: 'test@test',
        subscriptions: [
          {
            status: 'active',
            renewalStatus: 'will_renew',
            group: 'core',
            platform: 'web',
            offering: 'core:monthly',
            periodEndsAt: Timestamp.fromDate(end),
            periodStartsAt: Timestamp.fromDate(start),
            purchasedAt: Timestamp.fromDate(start),
          },
        ],
      }
    },

    async getSubscriptionGroup() {
      return {
        offerings: [
          {
            id: 'core:monthly',
            product: 'bluesky_plus_core_v1_monthly',
          },
          {
            id: 'core:annual',
            product: 'bluesky_plus_core_v1_annual',
          },
        ],
      }
    },

    async ping() {
      return {}
    },
  })
