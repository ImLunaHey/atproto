/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, is$typed } from '../../../../util'
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server'
import * as ToolsOzoneCommunicationDefs from './defs'

const id = 'tools.ozone.communication.updateTemplate'

export interface QueryParams {}

export interface InputSchema {
  /** ID of the template to be updated. */
  id: string
  /** Name of the template. */
  name?: string
  /** Message language. */
  lang?: string
  /** Content of the template, markdown supported, can contain variable placeholders. */
  contentMarkdown?: string
  /** Subject of the message, used in emails. */
  subject?: string
  /** DID of the user who is updating the template. */
  updatedBy?: string
  disabled?: boolean
  [k: string]: unknown
}

export type OutputSchema = ToolsOzoneCommunicationDefs.TemplateView

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
  error?: 'DuplicateTemplateName'
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
