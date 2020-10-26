import {Controller, Get, Param, Post, Render, Req, Res, UseFilters, UseGuards} from '@nestjs/common'
import {Request, Response} from 'express'
import { AppService } from './app.service';
import {AuthenticatedGuard} from './auth/authenticated.guard'
import {UnauthorizedFilter} from './auth/unauthorized.filter'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  public async index() {
    const people = await this.appService.getPeople()
    return {
      people,
      message: 'This is text from the controller!'
    }
  }

  @Post('/process')
  public async process(@Req() req: Request, @Res() res: Response) {
    const {name, email} = req.body
    await this.appService.createPerson(name, email)
    return res.redirect('/')
  }

  @Get('/delete/:name')
  public async delete(@Param() params, @Res() res: Response) {
    await this.appService.delete(params.name)
    return res.redirect('/')
  }

  @Get('secured-page')
  @UseGuards(AuthenticatedGuard)
  @UseFilters(UnauthorizedFilter)
  public async securedPage() {
    return 'Secured page'
  }
}
