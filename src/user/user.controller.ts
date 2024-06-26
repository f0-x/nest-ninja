import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getMe(@Req() req: Request) {
        return req.user;
    }
}
