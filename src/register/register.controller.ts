import {Controller, Get, Post, Render, Req, Res, Body} from '@nestjs/common';
import {Request, Response} from 'express'
import {RegisterService} from './register.service';
import {RegisterDto} from "./dto/register.dto";

@Controller('register')
export class RegisterController {

    constructor(private readonly registerService: RegisterService) {
    }

    @Render('register/index')
    @Get()
    showForm(@Req() req: Request) {
        req.flash('')
        return {
            error: req.flash('error')
        }
    }

    @Post()
    async register(@Req() req: Request, @Res() res: Response, @Body() body: RegisterDto) {
        try {
            await this.registerService.validate(body)
            await this.registerService.register(body)
            req.flash('registerSuccess', 'Your registration is success')
            res.redirect('/auth')
        } catch (e) {
            req.flash('error', e)
            res.redirect('/register')
        }
    }
}
