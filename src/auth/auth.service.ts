import { Injectable } from '@nestjs/common';
import {User} from "../users/schemas/users.schema";
import {UserLoginDto} from "./dto/userLogin.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {
    }

    async validateUser(dto: UserLoginDto): Promise<User> {
        const user = await this.usersService.findUser(dto.email)

        if (!user) {
            throw new Error('userDontExists')
        }

        if (!await this.usersService.comparePassword(dto.password, user.password)) {
            throw new Error('userPasswordWrong')
        }

        return  user
    }
}
