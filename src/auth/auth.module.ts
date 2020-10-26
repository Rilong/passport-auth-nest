import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {UsersModule} from '../users/users.module'
import {AuthController} from './auth.controller'
import {PassportModule} from '@nestjs/passport'
import {LocalStrategy} from './local.strategy'
import {SessionSerializer} from './session.serializer'

@Module({
    imports: [
        UsersModule,
        PassportModule.register({
            session: true
        })
    ],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    controllers: [AuthController],
    exports: [PassportModule, AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule {
}
