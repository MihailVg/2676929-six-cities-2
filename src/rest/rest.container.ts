import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/types/index.js';
import { ILogger, PinoLogger } from '../shared/libs/logger/index.js';
import {
  IConfig,
  RestSchema,
  RestConfig,
} from '../shared/libs/config/index.js';
import {
  MongoDatabaseClient,
  IDatabaseClient,
} from '../shared/libs/database-client/index.js';
import { IExceptionFilter } from '../shared/libs/rest/exception-filter/exception-filter.interface.js';
import { AppExceptionFilter } from '../shared/libs/rest/exception-filter/app-exception-filter.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer
    .bind<RestApplication>(Component.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  restApplicationContainer
    .bind<ILogger>(Component.Logger)
    .to(PinoLogger)
    .inSingletonScope();
  restApplicationContainer
    .bind<IConfig<RestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  restApplicationContainer
    .bind<IDatabaseClient>(Component.DatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();
  restApplicationContainer
    .bind<IExceptionFilter>(Component.ExceptionFilter)
    .to(AppExceptionFilter)
    .inSingletonScope();

  return restApplicationContainer;
}
