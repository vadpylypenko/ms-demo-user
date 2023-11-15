import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmqpServiceToken } from 'domain-event-typeorm';
import { UserController } from './controller/user.controller';
import { UserEntity } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserDomainEventPublisherFactoryService } from './service/user-domain-event-publisher-factory.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserDomainEventPublisherFactoryService],
})
export class UserModule implements OnApplicationBootstrap {
  constructor(
    @Inject(AmqpServiceToken)
    private readonly amqp: any,
  ) {}

  onApplicationBootstrap() {
    this.amqp.connect();
  }
}
