import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CapsuleController, CapsuleService } from './capsule';
import { TimeLockService } from './timelock';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CapsuleController],
  providers: [CapsuleService, TimeLockService],
})
export class AppModule {}
