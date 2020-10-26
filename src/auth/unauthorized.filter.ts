import {ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, UnauthorizedException} from '@nestjs/common'
import {Response} from 'express'

@Catch(UnauthorizedException, ForbiddenException)
export class UnauthorizedFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException | ForbiddenException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        response.redirect('/auth')
    }
}