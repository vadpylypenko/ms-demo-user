import { AbstractTypeOrmDomainEventPublisherService } from 'domain-event-typeorm';
import { UserCreatedEvent } from '../event/user-created.event';

export class UserDomainEventPublisherService extends AbstractTypeOrmDomainEventPublisherService<UserCreatedEvent> {}
