import {
  AbstractAmqpChannelConfiguration,
  AmqpExchangeConfigurationAwareInterface,
  AmqpExchangeConfigurationInterface,
  ExchangeType,
} from 'amp-configuration';

export class UserDomainEventAmqpExchangeChannelConfigurationService
  extends AbstractAmqpChannelConfiguration
  implements AmqpExchangeConfigurationAwareInterface
{
  /**
   * @inheritdoc
   */
  getExchangeConfiguration(): AmqpExchangeConfigurationInterface[] {
    return [
      {
        name: 'domain.event',
        type: ExchangeType.TOPIC,
        options: { durable: true },
      },
    ];
  }
}
