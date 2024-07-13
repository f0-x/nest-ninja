import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    async updateMe(updatedUserDetails: User) {
        const updatedUser = await this.prisma.user.update({
            where: { id: updatedUserDetails.id },
            data: updatedUserDetails,
        });
        return updatedUser;
    }
}
