import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { UserDocument } from 'schemas/user';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    createdUser.save();
    return;
  }

  findAll(query: FindUserDto) {
    return this.userModel.find(query).exec();
  }

  findOne(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id, updateUserDto }).exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
