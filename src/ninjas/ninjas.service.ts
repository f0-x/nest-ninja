import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNinjaDto } from "./dto/create-ninja.dto";
import { updateNinjaDto } from "./dto/update-ninja.dto";

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: "Ryu", belt: "Orange" },
    { id: 1, name: "Jin", belt: "Black" },
  ];
  getNinjas(belt?: string) {
    if (belt) {
      return this.ninjas.filter((ninja) => ninja.belt === belt);
    }
    return this.ninjas;
  }
  getANinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error("Ninja not found");
    }
    return ninja;
  }
  createANinja(ninja: CreateNinjaDto) {
    const newNinja = {
      id: Date.now(),
      ...ninja,
    };
    this.ninjas.push(newNinja);
    return newNinja;
  }
  updateNinja(id: number, updateNinjaData: updateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) =>
      ninja.id === id ? { ...ninja, ...updateNinjaData } : ninja
    );
    return this.getANinja(id);
  }
  removeNinja(id: number) {
    const ninjaToBeRemoved = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninjaToBeRemoved) {
      throw new Error("Ninja not found");
    }
    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);
    return ninjaToBeRemoved;
  }
}
