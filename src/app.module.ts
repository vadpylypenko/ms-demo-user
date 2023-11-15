import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DomainEventEnvelopeEntity,
  HandledDomainEventEntity,
  DomainEventTypeOrmModule,
} from 'domain-event-typeorm';
import { CommonModule } from './common/common.module';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [
        UserEntity,
        DomainEventEnvelopeEntity,
        HandledDomainEventEntity,
      ],
    }),
    ScheduleModule.forRoot(),
    UserModule,
    DomainEventTypeOrmModule.forRoot(),
    CommonModule,
  ],
})
export class AppModule {}
