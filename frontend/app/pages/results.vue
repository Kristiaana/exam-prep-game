<script setup lang="ts">
import { useGameStore } from "~~/stores/game";

interface ResultItem {
  playerName: string;
  durationMs: number;
  completedAt: string;
  answers: {
    questionKey: string;
    selectedOption: "A" | "B" | "C";
    isCorrect: boolean;
    attemptNumber: number;
    answeredAt: string;
  }[];
  collectedBooks: string[];
}

const router = useRouter();
const game = useGameStore();
const leaderboard = ref<ResultItem[]>([]);
const lastResult = ref<ResultItem | null>(null);

onMounted(() => {
  leaderboard.value = JSON.parse(
    localStorage.getItem("exam-game-leaderboard") || "[]",
  );

  lastResult.value = JSON.parse(
    localStorage.getItem("exam-game-last-result") || "null",
  );
});

function formatDuration(durationMs: number) {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function playAgain() {
  const name =
    lastResult.value?.playerName ||
    localStorage.getItem("exam-game-player-name") ||
    "";
  game.startGame(name);
  router.push("/game");
}

function goHome() {
  game.resetGame();
  router.push("/");
}
</script>

<template>
  <div class="page-shell">
    <div class="panel results-panel">
      <h1 class="title results-title">Rezultāti</h1>

      <div class="results-block">
        <div v-if="leaderboard.length" class="leaderboard-list">
          <div
            v-for="(item, index) in leaderboard"
            :key="`${item.playerName}-${item.completedAt}-${index}`"
            class="leaderboard-row"
          >
            <div class="leaderboard-rank">#{{ index + 1 }}</div>
            <div class="leaderboard-name">{{ item.playerName }}</div>
            <div class="leaderboard-time">
              {{ formatDuration(item.durationMs) }}
            </div>
          </div>
        </div>

        <p v-else>Vēl nav neviena rezultāta.</p>
      </div>

      <div class="results-actions">
        <button class="secondary-btn results-btn" @click="playAgain">
          Spēlēt vēlreiz
        </button>
        <button class="primary-btn results-btn" @click="goHome">
          Uz sākumu
        </button>
      </div>
    </div>
  </div>
</template>
