import { Expose } from 'class-transformer';
import { IUser } from '../../../types/user.type.js';

export class CommentRdo {
  @Expose()
  public text: string;

  @Expose()
  public rating: number;

  @Expose()
  public postDate: Date;

  @Expose({ name: 'authorId' })
  public author: IUser;
}
