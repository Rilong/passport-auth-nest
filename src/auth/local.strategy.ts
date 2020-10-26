import {Injectable, UnauthorizedException} from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import {Strategy} from 'passport-local'
import {AuthService} from './auth.service'
import {User} from '../users/schemas/users.schema'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super({
            usernameField: 'email'
        })
    }

    async validate(email: string, password: string): Promise<User> {
        try {
            return await this.authService.validateUser({email, password})
        } catch (e) {
            throw new UnauthorizedException()
        }
    }
}