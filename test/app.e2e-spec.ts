import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/ninjas")
      .expect(200)
      .expect([
        {
          id: 0,
          name: "Ryu",
          belt: "Orange",
        },
        {
          id: 1,
          name: "Jin",
          belt: "Black",
        },
      ]);
  });

  afterAll(async () => {
    await app.close();
  });
});
