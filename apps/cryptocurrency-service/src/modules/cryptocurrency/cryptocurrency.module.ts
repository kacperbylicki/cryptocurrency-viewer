import { BingNewsClient, CoinRankingClient } from './clients';
import {
  CryptocurrencyController,
  FavoriteCryptocurrencyController,
} from './controllers';
import {
  CryptocurrencyService,
  FavoriteCryptocurrencyService,
} from './services';
import {
  FavoriteCryptocurrency,
  FavoriteCryptocurrencySchema,
} from './entities';
import { FavoriteCryptocurrencyRepository } from './repositories';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FavoriteCryptocurrency.name,
        schema: FavoriteCryptocurrencySchema,
      },
    ]),
  ],
  providers: [
    CryptocurrencyService,
    FavoriteCryptocurrencyService,
    FavoriteCryptocurrencyRepository,
    CoinRankingClient,
    BingNewsClient,
  ],
  controllers: [CryptocurrencyController, FavoriteCryptocurrencyController],
})
export class CryptocurrencyModule {}
