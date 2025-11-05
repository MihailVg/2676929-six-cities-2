import { Container } from 'inversify';
import { IOfferService } from './offer-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { DefaultOfferService } from './default-offer.service.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { IController } from '../../libs/rest/controller/controller.interface.js';
import { OfferController } from './offer.controller.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer
    .bind<IOfferService>(Component.OfferService)
    .to(DefaultOfferService);
  offerContainer
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);
  offerContainer
    .bind<IController>(Component.OfferController)
    .to(OfferController)
    .inSingletonScope();

  return offerContainer;
}
