import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
 
  constructor(private prismaService: PrismaService) {}

  async saveData(data: { id: number; value: string }): Promise<{ id: number; value: string }> {
    const row = await this.prismaService.test_table.create({ data });
    return row;
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
