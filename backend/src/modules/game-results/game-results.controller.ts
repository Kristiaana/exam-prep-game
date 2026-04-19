import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateGameResultDto } from './dto/create-game-result.dto';
import { GameResultsService } from './game-results.service';

@Controller('game-results')
export class GameResultsController {
  constructor(private readonly gameResultsService: GameResultsService) {}

  @Post()
  async create(@Body() dto: CreateGameResultDto) {
    return await this.gameResultsService.create(dto);
  }

  @Get('leaderboard')
  async getLeaderboard(@Query('limit') limit?: string) {
    const parsedLimit = limit ? Number(limit) : 20;
    return await this.gameResultsService.getLeaderboard(parsedLimit);
  }
}
