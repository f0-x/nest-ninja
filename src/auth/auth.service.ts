import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { SignUpDto } from "./dto/auth.dto";
import * as argon2 from "argon2";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}
  async login(signInDto: Partial<SignUpDto>) {
    //Find the user by email
    // if user not found throw appropriate exception
    const user: Partial<User> | null = await this.prisma.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });
    if (!user) {
      throw new Error("User doesn't exist, wrong email maybe ?");
    }

    //compare password, if password incorrect throw appropriate exception
    if (signInDto.password && user.hash) {
      const passwordMatches = await argon2.verify(
        user.hash,
        signInDto.password
      );
      if (!passwordMatches) {
        throw new Error("Password incorrect");
      }
    }
    //finally return the user
    delete user.hash;
    // return user;
    return this.signToken(user.id, user.email);
  }

  async register(signUpDto: SignUpDto) {
    //Generate the password hash
    const hash = await argon2.hash(signUpDto.password);
    try {
      // Save user in the db
      const user: Partial<User> = await this.prisma.user.create({
        data: {
          email: signUpDto.email,
          hash,
          firstName: signUpDto.firstName,
          lastName: signUpDto.lastName,
        },
        // select: {
        //   email: true,
        //   firstName: true,
        //   lastName: true
        // }
      });
      //Delete the userhash from the response
      delete user.hash;
      //Return the saved user
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          // throw new Error("Email already taken");
          throw new ForbiddenException("Email already taken");
        }
      }
      //If the error's not related to Prisma
      throw error;
    }
  }

  async signToken(
    userId?: number,
    email?: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get("JWT_SECRET");
    const token = await this.jwt.signAsync(payload, {
      expiresIn: "15m",
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
