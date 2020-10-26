import { Injectable } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {RegisterDto} from './dto/register.dto';
import {User} from '../users/schemas/users.schema';

@Injectable()
export class RegisterService {
    constructor(private readonly usersService: UsersService) {}

    async validate(dto: RegisterDto): Promise<boolean> {
        // Validate exists email
        const user = await this.usersService.findUser(dto.email)

        if (user) {
            return Promise.reject(false)
        }

        // Validate required
        if (!dto.email || !dto.password || !dto.passwordConfirm) {
            return Promise.reject(false)
        }

        // Validate to confirm password

        if (dto.password !== dto.passwordConfirm) {
            return Promise.reject(false)
        }

        // Everything's OK
        return Promise.resolve(true)
    }

    async register(dto: RegisterDto): Promise<User | boolean> {
        const password = await this.usersService.generateHashPassword(dto.password)

        const user = await this.usersService.create({
            email: dto.email,
            name: dto.name,
            password
        })

        if (!user) {
            return Promise.resolve(false)
        }

        return user
    }
}
