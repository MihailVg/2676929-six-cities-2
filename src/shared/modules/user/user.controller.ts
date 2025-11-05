import { inject, injectable } from 'inversify';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { TCreateUserRequest } from './create-user-request.type.js';
import { IUserService } from './user-service.interface.js';
import { IConfig } from '../../libs/config/config.interface.js';
import { RestSchema } from '../../libs/config/rest.schema.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { UserRdo } from './rdo/user.rdo.js';
import { fillDTO } from '../../helpers/common.js';
import { Response } from 'express';
import { TLoginUserRequest } from './login-user-request.type.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config)
    private readonly configService: IConfig<RestSchema>
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');
    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
    });
  }

  public async create(
    { body }: TCreateUserRequest,
    res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${body.email} already exists`
      );
    }

    const result = await this.userService.create(
      body,
      this.configService.get('SALT')
    );
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: TLoginUserRequest,
    _res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController'
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }
}
