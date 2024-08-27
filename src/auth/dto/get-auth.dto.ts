import { PartialType } from '@nestjs/mapped-types';

import { CreateAuthDto } from './create-auth.dto';

export class GetAuthDto extends PartialType(CreateAuthDto) {}
