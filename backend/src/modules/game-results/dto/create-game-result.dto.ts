import { IsDateString, IsInt, IsString, MaxLength, Min } from 'class-validator';

export class CreateGameResultDto {
  @IsString()
  @MaxLength(100)
  playerName: string;

  @IsInt()
  @Min(0)
  durationMs: number;

  @IsInt()
  @Min(0)
  correctAnswers: number;

  @IsInt()
  @Min(1)
  totalQuestions: number;

  @IsDateString()
  completedAt: string;
}
