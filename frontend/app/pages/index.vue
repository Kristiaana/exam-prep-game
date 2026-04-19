<script setup lang="ts">
import { useGameStore } from "~~/stores/game";

const router = useRouter();
const game = useGameStore();

const step = ref<"welcome" | "name">("welcome");
const playerName = ref("");

const canStart = computed(() => playerName.value.trim().length >= 2);

function startGame() {
  const name = playerName.value.trim();
  if (!name) return;

  game.startGame(name);
  router.push("/game");
}
</script>

<template>
  <div class="page-shell">
    <div class="panel">
      <h1 class="title">Eksāmenu sagatavošanās spēle</h1>
      <p class="subtitle">
        Pildi uzdevumus, vāc grāmatas un sacenties ar draugiem par labāko
        rezultātu!
      </p>

      <div v-if="step === 'welcome'">
        <button class="primary-btn" @click="step = 'name'">Spēlēt</button>
      </div>

      <div v-else class="name-form">
        <label
          for="playerName"
          style="display: block; margin-bottom: 10px; font-weight: 600"
        >
          Ievadi savu vārdu
        </label>

        <input
          id="playerName"
          v-model="playerName"
          class="input"
          type="text"
          maxlength="40"
        />

        <div style="display: flex; gap: 12px; margin-top: 20px">
          <button class="secondary-btn" @click="step = 'welcome'">
            Atpakaļ
          </button>
          <button class="primary-btn" :disabled="!canStart" @click="startGame">
            Sākt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
