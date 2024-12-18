/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import {
  isValid as _isValid,
  validate as _validate,
} from '../../../../lexicons'
import { $Type, $Typed, is$typed as _is$typed, OmitKey } from '../../../../util'
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server'

const is$typed = _is$typed,
  isValid = _isValid,
  validate = _validate
const id = 'com.atproto.server.createInviteCodes'

export interface QueryParams {}

export interface InputSchema {
  codeCount: number
  useCount: number
  forAccounts?: string[]
}

export interface OutputSchema {
  codes: AccountCodes[]
}

export interface HandlerInput {
  encoding: 'application/json'
  body: InputSchema
}

export interface HandlerSuccess {
  encoding: 'application/json'
  body: OutputSchema
  headers?: { [key: string]: string }
}

export interface HandlerError {
  status: number
  message?: string
}

export type HandlerOutput = HandlerError | HandlerSuccess | HandlerPipeThrough
export type HandlerReqCtx<HA extends HandlerAuth = never> = {
  auth: HA
  params: QueryParams
  input: HandlerInput
  req: express.Request
  res: express.Response
}
export type Handler<HA extends HandlerAuth = never> = (
  ctx: HandlerReqCtx<HA>,
) => Promise<HandlerOutput> | HandlerOutput

export interface AccountCodes {
  $type?: $Type<'com.atproto.server.createInviteCodes', 'accountCodes'>
  account: string
  codes: string[]
}

const hashAccountCodes = 'accountCodes'

export function isAccountCodes<V>(v: V) {
  return is$typed(v, id, hashAccountCodes)
}

export function validateAccountCodes<V>(v: V) {
  return validate<AccountCodes & V>(v, id, hashAccountCodes)
}

export function isValidAccountCodes<V>(v: V) {
  return isValid<AccountCodes>(v, id, hashAccountCodes)
}
