import { Request } from 'express';
import { TRequestParams } from '../../libs/rest/types/request-params.type.js';
import { TRequestBody } from '../../libs/rest/types/request-body.type.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

export type TCreateOfferRequest = Request<
  TRequestParams,
  TRequestBody,
  CreateOfferDto
>;
