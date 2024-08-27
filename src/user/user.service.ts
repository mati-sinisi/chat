import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDocument } from 'schemas/user';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds
    );

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword
    });

    return createdUser.save();
  }

  findAll(query: FindUserDto) {
    return this.userModel.find(query).exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  findOne(name: string) {
    return this.userModel.findOne({ name }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id, updateUserDto }).exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
