import { Request } from 'express';
import { TRequestParams } from '../../libs/rest/types/request-params.type.js';
import { TRequestBody } from '../../libs/rest/types/request-body.type.js';
import { CreateUserDto } from './dto/create-user.dto.js';

export type TCreateUserRequest = Request<
  TRequestParams,
  TRequestBody,
  CreateUserDto
>;
