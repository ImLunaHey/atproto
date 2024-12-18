/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { $Type, is$typed } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import * as ChatBskyConvoDefs from './defs'

const id = 'chat.bsky.convo.getLog'

export interface QueryParams {
  cursor?: string
}

export type InputSchema = undefined

export interface OutputSchema {
  cursor?: string
  logs: (
    | ChatBskyConvoDefs.LogBeginConvo
    | ChatBskyConvoDefs.LogLeaveConvo
    | ChatBskyConvoDefs.LogCreateMessage
    | ChatBskyConvoDefs.LogDeleteMessage
    | { $type: string; [k: string]: unknown }
  )[]
  [k: string]: unknown
}

export interface CallOptions {
  signal?: AbortSignal
  headers?: HeadersMap
}

export interface Response {
  success: boolean
  headers: HeadersMap
  data: OutputSchema
}

export function toKnownErr(e: any) {
  return e
}
