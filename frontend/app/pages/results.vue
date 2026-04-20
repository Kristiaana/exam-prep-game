<script setup lang="ts">
import { nextTick } from "vue";
import { useGameResultsApi } from "~~/composables/useGameResultsApi";
import { useGameStore } from "~~/stores/game";

interface ResultItem {
  id?: string;
  playerName: string;
  durationMs: number;
  correctAnswers?: number;
  totalQuestions?: number;
  completedAt: string;
}

const router = useRouter();
const game = useGameStore();
const { getLeaderboard } = useGameResultsApi();

const leaderboard = ref<ResultItem[]>([]);
const isLoading = ref(true);

const lastResult = computed(() => game.finishedResult);
const highlightedResultId = computed(() => game.lastSubmittedResultId);

function resultRowId(id?: string) {
  return id ? `result-row-${id}` : "";
}

async function scrollToHighlightedResult() {
  if (!highlightedResultId.value) return;

  await nextTick();

  requestAnimationFrame(() => {
    setTimeout(() => {
      const element = document.getElementById(
        resultRowId(highlightedResultId.value),
      );

      if (!element) return;

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 120);
  });
}

watch(
  [leaderboard, highlightedResultId, isLoading],
  async ([rows, highlightedId, loading]) => {
    if (loading) return;
    if (!highlightedId) return;
    if (!rows.length) return;

    await scrollToHighlightedResult();
  },
  { flush: "post" },
);

onMounted(async () => {
  try {
    leaderboard.value = (await getLeaderboard(100)) as ResultItem[];
  } catch (error) {
    console.error("Failed to load leaderboard", error);
    leaderboard.value = [];
  } finally {
    isLoading.value = false;
  }
});

function formatDuration(durationMs: number) {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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

      <div v-if="lastResult" class="results-block">
        <h2 class="section-title">Tavs rezultāts</h2>
        <div class="leaderboard-row leaderboard-row-current">
          <div class="leaderboard-rank">Tu</div>
          <div class="leaderboard-name">{{ lastResult.playerName }}</div>
          <div class="leaderboard-time">
            {{ formatDuration(lastResult.durationMs) }}
          </div>
        </div>
      </div>

      <div class="results-block">
        <h2 class="section-title">Leaderboard</h2>

        <p v-if="isLoading">Ielādējas...</p>

        <div v-else-if="leaderboard.length" class="leaderboard-list">
          <div
            v-for="(item, index) in leaderboard"
            :id="resultRowId(item.id)"
            :key="item.id || `${item.playerName}-${item.completedAt}-${index}`"
            class="leaderboard-row"
            :class="{
              'leaderboard-row-highlighted': item.id === highlightedResultId,
            }"
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
        <button class="primary-btn results-btn" @click="goHome">
          Uz sākumu
        </button>
      </div>
    </div>
  </div>
</template>
