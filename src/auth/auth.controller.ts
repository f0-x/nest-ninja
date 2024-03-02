import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("signin")
  async signIn(@Body(ValidationPipe) signInDto: Partial<SignUpDto>) {
    try {
      return await this.authService.login(signInDto);
    } catch (error) {
        if(error instanceof Error){
            throw new NotFoundException(error.message);
        }
    }
  }
  @Post("signup")
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    try {
      const newUser = await this.authService.register(signUpDto);
      return newUser;
    } catch (error) {
      throw new ForbiddenException("Please use a different email");
    }
  }
}
