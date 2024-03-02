import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NinjasModule } from "./ninjas/ninjas.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    NinjasModule,
    UsersModule,
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    ConfigModule.forRoot({isGlobal: true}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
