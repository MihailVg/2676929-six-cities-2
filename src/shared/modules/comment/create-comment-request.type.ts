import { TRequestParams } from '../../libs/rest/types/request-params.type.js';
import { TRequestBody } from '../../libs/rest/types/request-body.type.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { Request } from 'express';

export type TCreateCommentRequest = Request<
  TRequestParams,
  TRequestBody,
  CreateCommentDto
>;
