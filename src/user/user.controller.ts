import { Body, Controller, Get, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common';
import type { User } from '@prisma/client';
import { get_user } from 'src/auth/decorators/get_user.decorator';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';

@UseGuards(JWTGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('profile')
    getMe(@get_user() user: User){
        return user;
    }

    @HttpCode(HttpStatus.CREATED)
    @Patch('profile')
    updateMe(@Body() user: User){
        this.userService.updateMe(user);
        return user;
    }
}
