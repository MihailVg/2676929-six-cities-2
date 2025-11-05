import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public email: string;

  @Expose()
  public profileImage: string;

  @Expose()
  public name: string;

  @Expose()
  public type: string;
}
