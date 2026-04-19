interface CreateGameResultPayload {
  playerName: string;
  durationMs: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
}

export function useGameResultsApi() {
  const config = useRuntimeConfig();

  const baseUrl = config.public.apiBase;

  async function createGameResult(payload: CreateGameResultPayload) {
    return await $fetch(`${baseUrl}/game-results`, {
      method: "POST",
      body: payload,
    });
  }

  async function getLeaderboard(limit = 20) {
    return await $fetch(`${baseUrl}/game-results/leaderboard`, {
      method: "GET",
      query: { limit },
    });
  }

  return {
    createGameResult,
    getLeaderboard,
  };
}
