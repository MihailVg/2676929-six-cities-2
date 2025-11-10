import { Request } from 'express';
import { TRequestParams } from '../../libs/rest/types/request-params.type.js';
import { TRequestBody } from '../../libs/rest/types/request-body.type.js';
import { GetCommentDto } from './dto/get-comment.dto.js';

export type TGetCommentRequest = Request<
  TRequestParams,
  TRequestBody,
  GetCommentDto
>;
