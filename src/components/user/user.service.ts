import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { User } from './model/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findOneOrNull(
    filters: FilterQuery<User> = {},
    options?: QueryOptions<User>,
  ): Promise<User | null> {
    return this.userModel.findOne(filters, {}, options).exec();
  }

  async createUser(email: string): Promise<User> {
    return this.userModel.create({
      email,
    });
  }

  async doesUserExist(email: string): Promise<boolean> {
    const user = this.findOneOrNull({ email });
    return user ? true : false;
  }

  async updateUserStytchIdAndVerify(
    email: string,
    userIdStytch: string,
    isVerified: boolean,
  ) {
    const user = await this.userModel.updateOne(
      { email: email },
      {
        userIdStytch: userIdStytch,
        isVerified: isVerified,
        $setOnInsert: {
          email: email,
        },
      },
      { upsert: true },
    );

    console.log('user', user);

    return user;
  }
}
