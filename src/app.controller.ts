import { Body, Controller, Get, Post } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { randomUUID } from 'crypto'
import { CreateNotificationBody } from './create-notification-body'

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async list() {
    return this.prismaService.notifications.findMany()
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const notification = await this.prismaService.notifications.create({
      data: {
        id: randomUUID(),
        recipientId,
        content,
        category,
      },
    })

    return {
      notification,
    }
  }
}
