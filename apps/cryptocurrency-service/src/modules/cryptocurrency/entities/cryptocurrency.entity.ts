import { Model } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export class Cryptocurrency extends Model {
  @Prop({ type: String, unique: true, required: true })
  uuid!: string;

  @Prop({ type: String, required: true })
  change!: string;

  @Prop({ type: String, required: true })
  iconUrl!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  price!: string;

  @Prop({ type: Number, required: true })
  rank!: number;

  @Prop({ type: String, required: true })
  symbol!: string;

  @Prop({ type: String, required: true })
  dailyVolume!: string;

  @Prop({ type: String, required: true })
  marketCap!: string;

  @Prop({ type: [String], required: true })
  sparkline!: string[];
}
