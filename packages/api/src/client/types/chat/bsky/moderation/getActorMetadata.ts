/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import {
  isValid as _isValid,
  validate as _validate,
} from '../../../../lexicons'
import { $Type, $Typed, is$typed as _is$typed, OmitKey } from '../../../../util'

const is$typed = _is$typed,
  isValid = _isValid,
  validate = _validate
const id = 'chat.bsky.moderation.getActorMetadata'

export interface QueryParams {
  actor: string
}

export type InputSchema = undefined

export interface OutputSchema {
  day: Metadata
  month: Metadata
  all: Metadata
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

export interface Metadata {
  $type?: $Type<'chat.bsky.moderation.getActorMetadata', 'metadata'>
  messagesSent: number
  messagesReceived: number
  convos: number
  convosStarted: number
}

const hashMetadata = 'metadata'

export function isMetadata<V>(v: V) {
  return is$typed(v, id, hashMetadata)
}

export function validateMetadata<V>(v: V) {
  return validate<Metadata & V>(v, id, hashMetadata)
}

export function isValidMetadata<V>(v: V) {
  return isValid<Metadata>(v, id, hashMetadata)
}
