<script setup lang="ts">
defineProps<{
  rewardLabel: string;
}>();

defineEmits<{
  continue: [];
}>();
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal-card reward-card">
      <div class="reward-icon">📚</div>
      <h2 class="modal-title">Pareizi!</h2>
      <p class="reward-text">
        Tu saņēmi: <strong>{{ rewardLabel }}</strong>
      </p>

      <div class="modal-actions">
        <button class="primary-btn" @click="$emit('continue')">Turpināt</button>
      </div>
    </div>
  </div>
</template>
