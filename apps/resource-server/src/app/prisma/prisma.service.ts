import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from '../../../generated/prisma/client';
import { PrismaPostgresAdapter } from '@prisma/adapter-ppg'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const adapter = new PrismaPostgresAdapter({ connectionString: process.env["DATABASE_URL"] })
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
}