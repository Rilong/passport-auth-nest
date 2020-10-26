import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {Person, PersonDocument} from './schemas/person.schema'
@Injectable()
export class AppService {
  constructor(@InjectModel(Person.name) private personModel: Model<PersonDocument>) {}

  createPerson(name: string, email= ''): Promise<Person> {
    const person = new this.personModel({name, email})
    return person.save()
  }

  getPeople(): Promise<Person[]> {
    return this.personModel.find().exec()
  }

  delete(name): Promise<any> {
    return this.personModel.remove({name}).exec()
  }
}
