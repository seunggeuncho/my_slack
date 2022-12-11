import { Module } from '@nestjs/common';
import { DMsService } from './dms.service';
import { DMsController } from './dms.controller';
import { Workspaces } from 'src/entities/Workspaces';
import { EventsModule } from 'src/events/events.module';
import { Users } from 'src/entities/Users';
import { DMs } from 'src/entities/DMs';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DMs, Users, Workspaces]), EventsModule],
  providers: [DMsService],
  controllers: [DMsController],
})
export class DmsModule {}
