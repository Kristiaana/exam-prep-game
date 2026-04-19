<script setup lang="ts">
import { CircleAlert } from "lucide-vue-next";
import { stages } from "~~/data/stages";
import { useGameResultsApi } from "~~/composables/useGameResultsApi";
import { useGameStore } from "~~/stores/game";
import type { OptionKey } from "~~/types/game";

const router = useRouter();
const game = useGameStore();
const { createGameResult } = useGameResultsApi();

const selectedOption = ref<OptionKey | "">("");
const ready = ref(false);
const isSubmittingResult = ref(false);

const currentStage = computed(() => game.currentStage);

const nextClassroomStage = computed(() => {
  for (let i = game.currentStageIndex + 1; i < stages.length; i++) {
    if (stages[i]?.type === "classroom") {
      return stages[i];
    }
  }
  return null;
});

const hallwayButtonLabel = computed(() => {
  if (!nextClassroomStage.value) return "Turpināt";
  return `${nextClassroomStage.value.title}`;
});

onMounted(() => {
  if (!game.playerName || !game.startedAt) {
    ready.value = false;
    return;
  }

  ready.value = true;
});

function goForward() {
  if (currentStage.value?.type !== "hallway") return;
  game.nextStage();
}

function openQuestion() {
  selectedOption.value = "";
  game.openQuestionModal();
}

function submitAnswer() {
  if (!selectedOption.value) return;

  const result = game.submitAnswer(selectedOption.value);

  if (result.correct) {
    selectedOption.value = "";
  }
}

async function continueAfterReward() {
  const isLastStage = game.currentStageIndex >= 9;
  game.closeRewardModal();

  if (!isLastStage) return;

  if (!game.finishedResult || isSubmittingResult.value) {
    router.push("/results");
    return;
  }

  try {
    isSubmittingResult.value = true;

    await createGameResult({
      playerName: game.finishedResult.playerName,
      durationMs: game.finishedResult.durationMs,
      correctAnswers: game.finishedResult.correctAnswers,
      totalQuestions: game.finishedResult.totalQuestions,
      completedAt: game.finishedResult.completedAt,
    });
  } catch (error) {
    console.error("Failed to save result", error);
  } finally {
    isSubmittingResult.value = false;
    router.push("/results");
  }
}

function goHome() {
  game.resetGame();
  router.push("/");
}
</script>

<template>
  <div v-if="ready && currentStage" class="game-page">
    <div class="game-topbar flex justify-center">
      <div class="game-chip">👤 {{ game.playerName }}</div>
      <GameTimer
        :started-at="game.startedAt"
        :finished-at="game.finishedAt || undefined"
      />
      <div class="game-chip">
        ✅ {{ game.completedQuestions }} / {{ game.totalQuestions }}
      </div>
    </div>

    <div
      class="stage-scene"
      :style="{ backgroundImage: `url(${currentStage.image})` }"
    >
      <div class="scene-overlay scene-overlay-centered">
        <template v-if="currentStage.type === 'hallway'">
          <button class="primary-btn hallway-only-btn" @click="goForward">
            ➜ {{ hallwayButtonLabel }}
          </button>
        </template>

        <template v-else>
          <div class="scene-panel scene-panel-centered">
            <h1 class="scene-title">
              {{ currentStage.title }}
            </h1>

            <div class="scene-actions scene-actions-centered">
              <button
                class="primary-btn scene-btn question-btn flex items-center gap-3"
                @click="openQuestion"
              >
                <CircleAlert class="btn-icon" />
                <span>Atvērt uzdevumu</span>
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <QuestionModal
      class="m-2"
      v-if="game.isQuestionModalOpen && game.currentQuestion"
      v-model="selectedOption"
      :question="game.currentQuestion"
      :cooldown-remaining="game.cooldownRemaining"
      @submit="submitAnswer"
    />

    <RewardModal
      class="m-2"
      v-if="game.isRewardModalOpen"
      :reward-label="game.lastRewardLabel"
      @continue="continueAfterReward"
    />
  </div>

  <div v-else class="page-shell">
    <div class="panel">
      <h1 class="title">Spēle nav sākta</h1>
      <p class="subtitle">Atgriezies sākumā un ievadi savu vārdu.</p>
      <button class="primary-btn" @click="goHome">Uz sākumu</button>
    </div>
  </div>
</template>
