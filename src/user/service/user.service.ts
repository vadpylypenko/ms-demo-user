import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import {
  AbstractTypeOrmDomainMutationEventService,
  TypeOrmTransactionInterface,
  EntityAndEventInterface,
  TypeOrmTransactionService,
} from 'mutation-typeorm';
import { UserEntity } from '../entity/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UserDataInterface } from '../interface/user-data.interface';
import { UserDomainEventPublisherFactoryService } from './user-domain-event-publisher-factory.service';
import { UserCreatedEvent } from '../event/user-created.event';
import { UserUpdatedEvent } from '../event/user-updated.event';
import { UserDeletedEvent } from '../event/user-deleted.event';
import { InjectEntityManager } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService extends AbstractTypeOrmDomainMutationEventService<
  UserEntity,
  UserDataInterface
> {
  /**
   * Constructor.
   *
   * @param entityManager - The instance of the repository.
   * @param eventPublisherFactory - The instance of the event publisher factory.
   * @param transactionService - The instance of the transaction service.
   */
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    eventPublisherFactory: UserDomainEventPublisherFactoryService,
    @Inject(TypeOrmTransactionService)
    transactionService: TypeOrmTransactionInterface,
  ) {
    super(eventPublisherFactory, transactionService);
  }

  /**
   * @inheritdoc
   */
  async getEntityForCreateAndEvent(
    queryRunner: QueryRunner,
    userData: UserDataInterface,
  ): Promise<EntityAndEventInterface<UserEntity>> {
    const entity = queryRunner.manager.create<UserEntity>(UserEntity, {
      ...userData,
      id: uuidv4(),
      version: 1,
    });
    const event = new UserCreatedEvent(entity);

    return { entity, event };
  }

  /**
   * @inheritdoc
   */
  async getEntityForUpdateAndEvent(
    queryRunner: QueryRunner,
    id: string,
    userData: UserDataInterface,
  ): Promise<EntityAndEventInterface<UserEntity>> {
    const found = await this.findOneById(queryRunner.manager, id);
    const entity = plainToInstance(UserEntity, { ...found, ...userData });
    const event = new UserUpdatedEvent(entity);

    return { entity, event };
  }

  /**
   * @inheritdoc
   */
  async getEntityForDeleteAndEvent(
    queryRunner: QueryRunner,
    id: string,
  ): Promise<EntityAndEventInterface<UserEntity>> {
    const entity = await this.findOneById(queryRunner.manager, id);
    const event = new UserDeletedEvent(id);

    return { entity, event };
  }

  getMany(): Promise<UserEntity[]> {
    return this.entityManager.find<UserEntity>(UserEntity);
  }

  getOne(id: string): Promise<UserEntity> {
    return this.findOneById(this.entityManager, id);
  }

  protected async findOneById(
    manager: EntityManager,
    id: string,
  ): Promise<UserEntity | null> {
    const user = await manager.findOneBy<UserEntity>(UserEntity, { id });

    if (!user) {
      throw new NotFoundException(`User not found for id: "${id}"`);
    }

    return user;
  }
}
