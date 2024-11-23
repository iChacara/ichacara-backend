import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from 'src/schemas/event.schema';
@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  public createEvent(event: Event): Promise<Event> {
    const eventModel = new this.eventModel(event);
    return eventModel.save();
  }

  public async listEvents(userId): Promise<Event[]> {
    return this.eventModel.find().where('userId').equals(userId).exec();
  }
}
