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
const id = 'com.atproto.server.listAppPasswords'

export interface QueryParams {}

export type InputSchema = undefined

export interface OutputSchema {
  passwords: AppPassword[]
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

export class AccountTakedownError extends XRPCError {
  constructor(src: XRPCError) {
    super(src.status, src.error, src.message, src.headers, { cause: src })
  }
}

export function toKnownErr(e: any) {
  if (e instanceof XRPCError) {
    if (e.error === 'AccountTakedown') return new AccountTakedownError(e)
  }

  return e
}

export interface AppPassword {
  $type?: $Type<'com.atproto.server.listAppPasswords', 'appPassword'>
  name: string
  createdAt: string
  privileged?: boolean
}

const hashAppPassword = 'appPassword'

export function isAppPassword<V>(v: V) {
  return is$typed(v, id, hashAppPassword)
}

export function validateAppPassword<V>(v: V) {
  return validate<AppPassword & V>(v, id, hashAppPassword)
}

export function isValidAppPassword<V>(v: V) {
  return isValid<AppPassword>(v, id, hashAppPassword)
}
