import { inject, injectable } from 'inversify';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { Component } from '../../types/component.enum.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { ICommentService } from './comment-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { TCreateCommentRequest } from './create-comment-request.type.js';
import { fillDTO } from '../../helpers/common.js';
import { Response } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.CommentService)
    private readonly commentService: ICommentService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    // this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  // public async index(
  //   { body }: TGetCommentRequest,
  //   res: Response
  // ): Promise<void> {
  //   const { offerId } = body;
  //   const comments = await this.commentService.findByOfferId(offerId);
  //   const responseData = fillDTO(CommentRdo, comments);
  //   this.ok(res, responseData);
  // }

  public async create(
    { body }: TCreateCommentRequest,
    res: Response
  ): Promise<void> {
    const result = await this.commentService.create(body);
    this.created(res, fillDTO(CreateCommentDto, result));
  }
}
