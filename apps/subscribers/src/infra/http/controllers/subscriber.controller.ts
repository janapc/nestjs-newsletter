import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RegisterSubscriberDto } from '../dtos/register-subscriber.dto';
import { RegisterSubscriber } from '@subscribers/application/usecases/register-subscriber';
import { UnsubscribeSubscriber } from '@subscribers/application/usecases/unsubscribe-subscriber';
import { GetActiveSubscribers } from '@subscribers/application/usecases/get-active-subscribers';
import { GetInactiveSubscribers } from '@subscribers/application/usecases/get-inactive-subscribers';
import { SubscriberResponseMapper } from '../mappers/subscriber-response-mapper';

@Controller('subscriber')
export class SubscriberController {
  constructor(
    private registerSubscriber: RegisterSubscriber,
    private unsubscribeSubscriber: UnsubscribeSubscriber,
    private getActiveSubscribers: GetActiveSubscribers,
    private getInactiveSubscribers: GetInactiveSubscribers,
  ) {}

  @Post()
  async register(@Body() body: RegisterSubscriberDto) {
    const { email } = body;
    await this.registerSubscriber.execute({ email });
  }

  @Patch('/:id/unsubscriber')
  async unsubscriber(@Param('id') id: string) {
    await this.unsubscribeSubscriber.execute(id);
  }

  @Get('/active')
  async activeSubscribers() {
    const { subscribers } = await this.getActiveSubscribers.execute();

    return {
      subscribers: subscribers.map(SubscriberResponseMapper.toHTTP),
      count: subscribers.length,
    };
  }

  @Get('/inactive')
  async inactiveSubscribers() {
    const { subscribers } = await this.getInactiveSubscribers.execute();
    return {
      subscribers: subscribers.map(SubscriberResponseMapper.toHTTP),
      count: subscribers.length,
    };
  }
}
