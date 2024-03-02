import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // url: "postgresql://postgres:postgres@localhost:5434/nest?schema=public",
          // url: process.env.DATABASE_URL,
          url: config.get<string>("DATABASE_URL"),
        },
      },
    });
    console.log("🚀 ~ file: prisma.service.ts:8 ~ PrismaService ~ constructor ~ config:", config)
  }
}
