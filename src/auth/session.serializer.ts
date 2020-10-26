import {PassportSerializer} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'
import {UsersService} from '../users/users.service'
import {User} from '../users/schemas/users.schema'

@Injectable()
export class SessionSerializer extends PassportSerializer {

    constructor(private usersService: UsersService) {
        super();
    }

    serializeUser(user: User, done: (err: any, id?: any) => void): any {
        done(null, user._id)
    }

    async deserializeUser(id: string, done: (err: any, id?: any) => void): Promise<any> {
        const user = await this.usersService.findById(id)
        done(null, user)
    }
}