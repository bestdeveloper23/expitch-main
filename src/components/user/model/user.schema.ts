import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'user', timestamps: true })
export class User {
  _id!: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, default: '' })
  firstName: string;

  @Prop({ type: String, default: '' })
  lastName: string;

  @Prop({ type: String, default: '' })
  phone: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, default: '' })
  password: string;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: String, default: '' })
  userIdStytch: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
