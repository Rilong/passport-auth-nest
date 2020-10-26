import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import * as bcrypt from 'bcrypt'
import {User} from './schemas/users.schema'
import {CreateUserDto} from './dto/CreateUserDto'

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async findUser(email: string): Promise<User> {
        const user = await this.userModel.findOne({email: email});
        if (!user) {
            return null
        }
        return user
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id)
    }

    async create(dto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(dto)
        return await newUser.save()
    }

    async generateHashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    }

    async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashPassword)
    }
}
