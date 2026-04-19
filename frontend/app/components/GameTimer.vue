<script setup lang="ts">
const props = defineProps<{
  startedAt: number;
  finishedAt?: number;
}>();

const now = ref(Date.now());

let intervalId: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now();
  }, 250);
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});

const formattedTime = computed(() => {
  if (!props.startedAt) return "00:00";

  const end = props.finishedAt || now.value;
  const diff = Math.max(0, end - props.startedAt);

  const totalSeconds = Math.floor(diff / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});
</script>
<template>
  <div class="game-chip">⏱ {{ formattedTime }}</div>
</template>
