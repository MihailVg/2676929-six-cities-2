import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto.js';
import { TRequestParams } from '../../libs/rest/types/request-params.type.js';
import { TRequestBody } from '../../libs/rest/types/request-body.type.js';

export type TLoginUserRequest = Request<
  TRequestParams,
  TRequestBody,
  LoginUserDto
>;
