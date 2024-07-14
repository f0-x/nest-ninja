import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "./../src/app.module";
import { AppService } from "src/app.service";
import { PrismaService } from "src/prisma/prisma.service";
import { describe, it, expect } from 'vitest';
import {prismaService} from './setupTests.e2e';
import { CreateUserDto } from "src/users/dto/create-user.dto";


describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [AppService, PrismaService],
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  }, 100000);

  // it("/ (GET)", () => {
  //   return request(app.getHttpServer())
  //     .get("/ninjas")
  //     .expect(200)
  //     .expect([
  //       {
  //         id: 0,
  //         name: "Ryu",
  //         belt: "Orange",
  //       },
  //       {
  //         id: 1,
  //         name: "Jin",
  //         belt: "Black",
  //       },
  //     ]);
  // });

  it("Signs Up The User (POST)", () => {
    return request(app.getHttpServer())
      .post("/auth/signup")
      .send({
        email: "yarsa@gmail.com",
        password: "yarsa123",
        firstName: "Yarsa Labs",
        lastName: "Intuji",
      })
      .expect(201)
      .expect({

      });
  }, 60000);

  afterAll(async () => {
    await app.close();
  });
});
