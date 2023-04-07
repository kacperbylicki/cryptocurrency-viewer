import { FavoriteCryptocurrency } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UpsertFavoriteCryptocurrencyRequest } from '../dtos';

@Injectable()
export class FavoriteCryptocurrencyRepository {
  constructor(
    @InjectModel(FavoriteCryptocurrency.name)
    private readonly model: Model<FavoriteCryptocurrency>,
  ) {}

  public async upsertOne(
    payload: UpsertFavoriteCryptocurrencyRequest,
  ): Promise<FavoriteCryptocurrency | null> {
    const filter = {
      userId: payload.userId,
      cryptocurrency: {
        uuid: payload.cryptocurrency.uuid,
      },
    };

    const options = {
      new: true,
      upsert: true,
    };

    const favoriteCryptocurrency = await this.model
      .findOneAndUpdate(filter, payload, options)
      .lean()
      .exec();

    return favoriteCryptocurrency;
  }

  public async findAllByUserId(
    userId: string,
  ): Promise<FavoriteCryptocurrency[]> {
    const usersFavoriteCryptocurrencies = await this.model
      .find({
        userId,
      })
      .lean()
      .exec();

    return usersFavoriteCryptocurrencies;
  }
}
