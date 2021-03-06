import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import {Request} from 'express'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const httpContext = context.switchToHttp()
        const request = httpContext.getRequest() as Request
        return request.isAuthenticated()
    }

}