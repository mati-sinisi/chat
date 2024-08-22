import { PartialType } from '@nestjs/mapped-types';
import { FindConversationDto } from './find-conversation.dto';

export class UpdateConversationDto extends PartialType(FindConversationDto) {}
