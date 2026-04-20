<script setup lang="ts">
defineProps<{
  rewardLabel: string;
  rewardImage: string;
  isLoading?: boolean;
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

      <div class="reward-book-wrap">
        <img
          v-if="rewardImage"
          :src="rewardImage"
          :alt="rewardLabel"
          class="reward-book-image"
        />
      </div>

      <p class="reward-text">
        Tu saņēmi: <strong>{{ rewardLabel }}</strong>
      </p>

      <p v-if="isLoading" class="reward-loading-text">
        Saglabājam rezultātu...
      </p>

      <div class="modal-actions reward-actions">
        <button
          class="primary-btn"
          :disabled="isLoading"
          @click="$emit('continue')"
        >
          {{ isLoading ? "Lūdzu, uzgaidi..." : "Turpināt" }}
        </button>
      </div>
    </div>
  </div>
</template>
