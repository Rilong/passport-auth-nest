import {Controller, Get, Post, Render, Req, Res, UseFilters, UseGuards} from '@nestjs/common'
import { Request, Response } from 'express'
import {LoginGuard} from './login.guard'
import {UnauthorizedFilter} from './unauthorized.filter'
import {AuthenticatedGuard} from './authenticated.guard'

@Controller('auth')
export class AuthController {
    @Render('auth/index')
    @Get()
    loginForm(@Req() req: Request, @Res() res: Response) {
        return {
            success: req.flash('registerSuccess')
        }
    }

    @Post()
    @UseGuards(LoginGuard)
    @UseFilters(UnauthorizedFilter)
    async login(@Req() req: Request, @Res() res: Response) {
        return req.user
            ? res.redirect('/')
            : res.redirect('/auth')
    }

    @Get('/logout')
    @UseGuards(AuthenticatedGuard)
    @UseFilters(UnauthorizedFilter)
    async logout(@Req() req: Request, @Res() res: Response) {
        req.logout()
        res.redirect('/')
    }
}
