export type OptionKey = "A" | "B" | "C";

export interface QuestionOption {
  key: OptionKey;
  text: string;
}

export interface Question {
  key: string;
  subject: string;
  prompt: string;
  options: QuestionOption[];
  correctOption: OptionKey;
  rewardLabel: string;
  rewardImage: string;
}

export type StageType = "hallway" | "classroom";

export interface Stage {
  id: number;
  type: StageType;
  title: string;
  image: string;
  questionKey?: string;
}
