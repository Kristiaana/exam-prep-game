import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('game_results')
export class GameResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  playerName: string;

  @Column({ type: 'int' })
  durationMs: number;

  @Column({ type: 'int' })
  correctAnswers: number;

  @Column({ type: 'int' })
  totalQuestions: number;

  @Column({ type: 'timestamp' })
  completedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
