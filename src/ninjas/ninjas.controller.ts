import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { CreateNinjaDto } from "./dto/create-ninja.dto";
import { updateNinjaDto } from "./dto/update-ninja.dto";
import { NinjasService } from "./ninjas.service";
import { CustomValidationPipe } from "src/validation/validation.pipe";
import { WeaponGuard } from "src/weapon.guard";

@Controller("ninjas")
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}
  @Get()
  // @UseGuards(WeaponGuard)
  // getNinjas(@Query("belt") belt: string, @Param("id", ParseIntPipe) id: number) {
  getNinjas() {
    return this.ninjaService.getNinjas();
  }
  @Get(":id")
  getNinja(@Param("id", ParseIntPipe) id: number) {
    try {
        return this.ninjaService.getANinja(id);
    } catch (error) {
        throw new NotFoundException();
    }
  }
  @Post()
  // createNinja(@Body(new CustomValidationPipe()) createNinjaBody: CreateNinjaDto) {
  createNinja(@Body(new ValidationPipe()) createNinjaBody: CreateNinjaDto) {
    return this.ninjaService.createANinja(createNinjaBody);
  }
  @Patch(":id")
  updateNinja(
    @Param("id") id: string,
    @Body() updateNinjaBody: updateNinjaDto
  ) {
    return this.ninjaService.updateNinja(+id, updateNinjaBody);
  }

  @Delete(":id")
    deleteNinja(@Param("id") id: string) {
        return this.ninjaService.removeNinja(+id);
    }
}
