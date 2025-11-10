import { inject, injectable } from 'inversify';
import { ILogger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import { IConfig } from '../shared/libs/config/index.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { IDatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import express, { Express } from 'express';
import { IController } from '../shared/libs/rest/controller/controller.interface.js';
import { IExceptionFilter } from '../shared/libs/rest/exception-filter/exception-filter.interface.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<RestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: IDatabaseClient,
    @inject(Component.OfferController)
    private readonly offerController: IController,
    @inject(Component.ExceptionFilter)
    private readonly appExceptionFilter: IExceptionFilter,
    @inject(Component.UserController)
    private readonly userController: IController,
    @inject(Component.CommentController)
    private readonly commentController: IController
  ) {
    this.server = express();
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async initExceptionsFilters() {
    this.server.use(
      this.appExceptionFilter.catch.bind(this.appExceptionFilter)
    );
  }

  private async initMiddleware() {
    this.server.use(express.json());
  }

  public async init() {
    this.logger.info('Application initialization');

    this.logger.info('Init database');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this.initMiddleware();
    this.logger.info('Middleware initialized');

    this.logger.info('Init controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filter');
    await this.initExceptionsFilters();
    this.logger.info('Exception filter initialized');

    this.logger.info('Try to init server...');
    await this.initServer();
    this.logger.info(
      `Server started on http://localhost:${this.config.get('PORT')}`
    );
  }
}
