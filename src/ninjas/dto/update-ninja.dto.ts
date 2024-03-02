import { PartialType } from "@nestjs/mapped-types";
import { CreateNinjaDto } from "./create-ninja.dto";
export class updateNinjaDto extends PartialType(CreateNinjaDto) {
    id: number;
}