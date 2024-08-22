import { InjectModel } from '@nestjs/mongoose';
import { HttpCode, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { FindConversationDto } from './dto/find-conversation.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation, ConversationDocument } from 'schemas/conversation';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>
  ) {}

  @HttpCode(201)
  create(createConversationDto: CreateConversationDto) {
    const createdConversation = new this.conversationModel(
      createConversationDto
    );
    createdConversation.save();
    return;
  }

  findAll(query: FindConversationDto) {
    return this.conversationModel.find(query).exec();
  }

  findOne(id: string) {
    return this.conversationModel.findOne({ id }).exec();
  }

  update(id: string, updateConversationDto: UpdateConversationDto) {
    return this.conversationModel
      .updateOne({ id }, updateConversationDto)
      .exec();
  }

  remove(id: string) {
    return this.conversationModel.deleteOne({ id }).exec();
  }
}
