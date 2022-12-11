/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMembers } from './entities/ChannelMembers';
import { ChannelChats } from './entities/ChannelChats';
import { Channels } from './entities/Channels';
import { DMs } from './entities/DMs';
import { Users } from './entities/Users';
import { Mentions } from './entities/Mentions';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { Workspaces } from './entities/Workspaces';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    WorkspacesModule,
    ChannelsModule,
    TypeOrmModule.forFeature([Users]),
    DmsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        ChannelChats,
        ChannelMembers,
        Channels,
        DMs,
        Mentions,
        Users,
        WorkspaceMembers,
        Workspaces,
      ],
      synchronize: false,
      logging: true, //orm작업 분석
      keepConnectionAlive: true, //서버가 재시작 될때 true로 안해놓으면 typeorm이 db를 끊음
      charset: 'utf8mb4'
    }),
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, UsersService, EventsGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
