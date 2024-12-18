/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import {
  isValid as _isValid,
  validate as _validate,
} from '../../../../lexicons'
import { $Type, $Typed, is$typed as _is$typed, OmitKey } from '../../../../util'
import type * as ComAtprotoServerDefs from '../server/defs'

const is$typed = _is$typed,
  isValid = _isValid,
  validate = _validate
const id = 'com.atproto.admin.defs'

export interface StatusAttr {
  $type?: $Type<'com.atproto.admin.defs', 'statusAttr'>
  applied: boolean
  ref?: string
}

const hashStatusAttr = 'statusAttr'

export function isStatusAttr<V>(v: V) {
  return is$typed(v, id, hashStatusAttr)
}

export function validateStatusAttr<V>(v: V) {
  return validate<StatusAttr & V>(v, id, hashStatusAttr)
}

export function isValidStatusAttr<V>(v: V) {
  return isValid<StatusAttr>(v, id, hashStatusAttr)
}

export interface AccountView {
  $type?: $Type<'com.atproto.admin.defs', 'accountView'>
  did: string
  handle: string
  email?: string
  relatedRecords?: { [_ in string]: unknown }[]
  indexedAt: string
  invitedBy?: ComAtprotoServerDefs.InviteCode
  invites?: ComAtprotoServerDefs.InviteCode[]
  invitesDisabled?: boolean
  emailConfirmedAt?: string
  inviteNote?: string
  deactivatedAt?: string
  threatSignatures?: ThreatSignature[]
}

const hashAccountView = 'accountView'

export function isAccountView<V>(v: V) {
  return is$typed(v, id, hashAccountView)
}

export function validateAccountView<V>(v: V) {
  return validate<AccountView & V>(v, id, hashAccountView)
}

export function isValidAccountView<V>(v: V) {
  return isValid<AccountView>(v, id, hashAccountView)
}

export interface RepoRef {
  $type?: $Type<'com.atproto.admin.defs', 'repoRef'>
  did: string
}

const hashRepoRef = 'repoRef'

export function isRepoRef<V>(v: V) {
  return is$typed(v, id, hashRepoRef)
}

export function validateRepoRef<V>(v: V) {
  return validate<RepoRef & V>(v, id, hashRepoRef)
}

export function isValidRepoRef<V>(v: V) {
  return isValid<RepoRef>(v, id, hashRepoRef)
}

export interface RepoBlobRef {
  $type?: $Type<'com.atproto.admin.defs', 'repoBlobRef'>
  did: string
  cid: string
  recordUri?: string
}

const hashRepoBlobRef = 'repoBlobRef'

export function isRepoBlobRef<V>(v: V) {
  return is$typed(v, id, hashRepoBlobRef)
}

export function validateRepoBlobRef<V>(v: V) {
  return validate<RepoBlobRef & V>(v, id, hashRepoBlobRef)
}

export function isValidRepoBlobRef<V>(v: V) {
  return isValid<RepoBlobRef>(v, id, hashRepoBlobRef)
}

export interface ThreatSignature {
  $type?: $Type<'com.atproto.admin.defs', 'threatSignature'>
  property: string
  value: string
}

const hashThreatSignature = 'threatSignature'

export function isThreatSignature<V>(v: V) {
  return is$typed(v, id, hashThreatSignature)
}

export function validateThreatSignature<V>(v: V) {
  return validate<ThreatSignature & V>(v, id, hashThreatSignature)
}

export function isValidThreatSignature<V>(v: V) {
  return isValid<ThreatSignature>(v, id, hashThreatSignature)
}
