import { Cryptocurrency } from './cryptocurrency.entity';
import { Model } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class FavoriteCryptocurrency extends Model {
  @Prop({ type: String, required: true })
  userId!: string;

  @Prop({ type: Cryptocurrency, required: true })
  cryptocurrency!: Cryptocurrency;

  @Prop({ type: Boolean, required: true })
  isFavorite!: boolean;
}

export const FavoriteCryptocurrencySchema = SchemaFactory.createForClass(
  FavoriteCryptocurrency,
);
export const FavoriteCryptocurrencyModelDefinition: ModelDefinition = {
  name: FavoriteCryptocurrency.name,
  schema: FavoriteCryptocurrencySchema,
};
