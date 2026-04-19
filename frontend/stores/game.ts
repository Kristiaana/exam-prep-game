import { defineStore } from "pinia";
import { questionsMap } from "~~/data/questions";
import { stages } from "~~/data/stages";
import type { OptionKey } from "~~/types/game";

interface AnswerLog {
  questionKey: string;
  selectedOption: OptionKey;
  isCorrect: boolean;
  attemptNumber: number;
  answeredAt: string;
}

interface FinishedResult {
  playerName: string;
  durationMs: number;
  completedAt: string;
  answers: AnswerLog[];
  collectedBooks: string[];
}

export const useGameStore = defineStore("game", {
  state: () => ({
    playerName: "",
    startedAt: 0,
    finishedAt: 0,
    currentStageIndex: 0,
    currentAttempt: 1,
    answers: [] as AnswerLog[],
    collectedBooks: [] as string[],
    answeredQuestionKeys: [] as string[],
    isQuestionModalOpen: false,
    isRewardModalOpen: false,
    lastRewardLabel: "",
    cooldownRemaining: 0,
    cooldownTimerId: null as ReturnType<typeof setInterval> | null,
  }),

  getters: {
    currentStage: (state) => stages[state.currentStageIndex] ?? null,
    totalQuestions: () => Object.keys(questionsMap).length,
    completedQuestions: (state) => state.answeredQuestionKeys.length,
    currentQuestion: (state) => {
      const stage = stages[state.currentStageIndex];
      if (!stage?.questionKey) return null;
      return questionsMap[stage.questionKey] ?? null;
    },
  },

  actions: {
    startGame(playerName: string) {
      this.resetGame();
      this.playerName = playerName;
      this.startedAt = Date.now();
    },

    nextStage() {
      if (this.currentStageIndex < stages.length - 1) {
        this.currentStageIndex += 1;
        this.currentAttempt = 1;
        this.isQuestionModalOpen = false;
      }
    },

    openQuestionModal() {
      this.isQuestionModalOpen = true;
    },

    closeRewardModal() {
      this.isRewardModalOpen = false;
      this.lastRewardLabel = "";

      if (this.currentStageIndex >= stages.length - 1) {
        this.finishGame();
      } else {
        this.nextStage();
      }
    },

    submitAnswer(selectedOption: OptionKey) {
      const question = this.currentQuestion;
      if (!question || this.cooldownRemaining > 0) return { correct: false };

      const isCorrect = selectedOption === question.correctOption;

      this.answers.push({
        questionKey: question.key,
        selectedOption,
        isCorrect,
        attemptNumber: this.currentAttempt,
        answeredAt: new Date().toISOString(),
      });

      if (isCorrect) {
        this.answeredQuestionKeys.push(question.key);
        this.collectedBooks.push(question.rewardLabel);
        this.isQuestionModalOpen = false;
        this.isRewardModalOpen = true;
        this.lastRewardLabel = question.rewardLabel;
        this.currentAttempt = 1;
        return { correct: true };
      }

      this.currentAttempt += 1;
      this.startCooldown();
      return { correct: false };
    },

    startCooldown() {
      if (this.cooldownTimerId) {
        clearInterval(this.cooldownTimerId);
      }

      this.cooldownRemaining = 5;

      this.cooldownTimerId = setInterval(() => {
        if (this.cooldownRemaining > 1) {
          this.cooldownRemaining -= 1;
          return;
        }

        this.cooldownRemaining = 0;

        if (this.cooldownTimerId) {
          clearInterval(this.cooldownTimerId);
          this.cooldownTimerId = null;
        }
      }, 1000);
    },

    finishGame() {
      this.finishedAt = Date.now();

      const result: FinishedResult = {
        playerName: this.playerName,
        durationMs: this.finishedAt - this.startedAt,
        completedAt: new Date().toISOString(),
        answers: this.answers,
        collectedBooks: this.collectedBooks,
      };

      localStorage.setItem("exam-game-last-result", JSON.stringify(result));

      const existing = JSON.parse(
        localStorage.getItem("exam-game-leaderboard") || "[]",
      ) as FinishedResult[];

      existing.push(result);
      existing.sort((a, b) => a.durationMs - b.durationMs);

      localStorage.setItem(
        "exam-game-leaderboard",
        JSON.stringify(existing.slice(0, 50)),
      );
    },

    resetGame() {
      if (this.cooldownTimerId) {
        clearInterval(this.cooldownTimerId);
      }

      this.playerName = "";
      this.startedAt = 0;
      this.finishedAt = 0;
      this.currentStageIndex = 0;
      this.currentAttempt = 1;
      this.answers = [];
      this.collectedBooks = [];
      this.answeredQuestionKeys = [];
      this.isQuestionModalOpen = false;
      this.isRewardModalOpen = false;
      this.lastRewardLabel = "";
      this.cooldownRemaining = 0;
      this.cooldownTimerId = null;
    },
  },
});
