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
import type * as ToolsOzoneModerationDefs from './defs'

const is$typed = _is$typed,
  isValid = _isValid,
  validate = _validate
const id = 'tools.ozone.moderation.getEvent'

export interface QueryParams {
  id: number
}

export type InputSchema = undefined
export type OutputSchema = ToolsOzoneModerationDefs.ModEventViewDetail

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
