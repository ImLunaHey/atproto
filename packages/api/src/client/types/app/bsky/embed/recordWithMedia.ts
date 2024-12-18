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
import type * as AppBskyEmbedRecord from './record'
import type * as AppBskyEmbedImages from './images'
import type * as AppBskyEmbedVideo from './video'
import type * as AppBskyEmbedExternal from './external'

const is$typed = _is$typed,
  isValid = _isValid,
  validate = _validate
const id = 'app.bsky.embed.recordWithMedia'

export interface Main {
  $type?: $Type<'app.bsky.embed.recordWithMedia', 'main'>
  record: AppBskyEmbedRecord.Main
  media:
    | $Typed<AppBskyEmbedImages.Main>
    | $Typed<AppBskyEmbedVideo.Main>
    | $Typed<AppBskyEmbedExternal.Main>
    | { $type: string }
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain)
}

export function isValidMain<V>(v: V) {
  return isValid<Main>(v, id, hashMain)
}

export interface View {
  $type?: $Type<'app.bsky.embed.recordWithMedia', 'view'>
  record: AppBskyEmbedRecord.View
  media:
    | $Typed<AppBskyEmbedImages.View>
    | $Typed<AppBskyEmbedVideo.View>
    | $Typed<AppBskyEmbedExternal.View>
    | { $type: string }
}

const hashView = 'view'

export function isView<V>(v: V) {
  return is$typed(v, id, hashView)
}

export function validateView<V>(v: V) {
  return validate<View & V>(v, id, hashView)
}

export function isValidView<V>(v: V) {
  return isValid<View>(v, id, hashView)
}
