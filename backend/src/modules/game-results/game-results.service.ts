import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameResultDto } from './dto/create-game-result.dto';
import { GameResultEntity } from './entities/game-result.entity';

@Injectable()
export class GameResultsService {
  constructor(
    @InjectRepository(GameResultEntity)
    private readonly gameResultsRepository: Repository<GameResultEntity>,
  ) {}

  async create(dto: CreateGameResultDto) {
    const entity = this.gameResultsRepository.create({
      playerName: dto.playerName.trim(),
      durationMs: dto.durationMs,
      correctAnswers: dto.correctAnswers,
      totalQuestions: dto.totalQuestions,
      completedAt: new Date(dto.completedAt),
    });

    return await this.gameResultsRepository.save(entity);
  }

  async getLeaderboard(limit = 100) {
    return await this.gameResultsRepository.find({
      order: {
        durationMs: 'ASC',
        completedAt: 'ASC',
      },
      take: limit,
    });
  }
}
