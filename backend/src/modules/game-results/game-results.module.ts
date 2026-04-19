import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameResultEntity } from './entities/game-result.entity';
import { GameResultsController } from './game-results.controller';
import { GameResultsService } from './game-results.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameResultEntity])],
  controllers: [GameResultsController],
  providers: [GameResultsService],
  exports: [GameResultsService],
})
export class GameResultsModule {}
