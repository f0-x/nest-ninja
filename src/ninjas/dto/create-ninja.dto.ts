import { z } from "nestjs-zod/z";
import {IsEnum, IsInt, IsString, MaxLength, MinLength} from "class-validator";
import { createZodDto } from "nestjs-zod";



const CreateNinjaSchema = z.object({
  name: z.string().min(1, "Please enter your name").max(24, "Please enter a shorter name"),
  age: z.number().min(1, "Please enter your age").max(99, "Please enter a shorter age"),
  belt: z.enum(["Orange", "Black"],{required_error: "Please enter a valid belt i.e either Orange or Black"})
});

export const CreateANinjaDto = createZodDto(CreateNinjaSchema);

export class CreateNinjaDto {
  @IsString()
  @MinLength(1,  {message: "Please enter your name"})
  @MaxLength(24, {message: "Please enter a shorter name"})
  name: string;
  @IsInt()
  age: number;
  @IsEnum(["Yellow", 'Black'], {message: "Please either pick Yellow or Black"})
  belt: string;
}
