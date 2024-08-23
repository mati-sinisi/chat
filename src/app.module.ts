import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [
    ChatModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public')
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ConversationModule,
    UserModule
  ]
})
export class AppModule {}
