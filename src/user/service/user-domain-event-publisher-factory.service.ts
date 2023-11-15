import { Injectable } from '@nestjs/common';
import {
  AbstractTypeOrmDomainEventPublisherFactoryService,
  TypeOrmEventPublisherFactoryOptionsInterface,
} from 'domain-event-typeorm';
import { UserDomainEventPublisherService } from './user-domain-event-publisher.service';

@Injectable()
export class UserDomainEventPublisherFactoryService extends AbstractTypeOrmDomainEventPublisherFactoryService {
  create(options: TypeOrmEventPublisherFactoryOptionsInterface) {
    return new UserDomainEventPublisherService(options.queryRunner);
  }
}
