import { Expose } from 'class-transformer';
import { OfferType } from '../../../types/offer-type.enum.js';
import { Facilities } from '../../../types/facilities.enum.js';
import { IUser } from '../../../types/user.type.js';
import { ICoordinates } from '../../../types/coordinates.type.js';

export class OfferRdo {
  @Expose()
  public _id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: string;

  @Expose()
  public previewImageLink: string;

  @Expose()
  public offerImages: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: string;

  @Expose()
  public rating: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public roomsAmount: number;

  @Expose()
  public guestsAmount: number;

  @Expose()
  public price: number;

  @Expose()
  public facilities: Facilities[];

  @Expose()
  public author: IUser;

  @Expose()
  public commentsLength: number;

  @Expose()
  public coordinates: ICoordinates;
}
