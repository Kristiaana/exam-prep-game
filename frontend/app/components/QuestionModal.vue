<script setup lang="ts">
import type { OptionKey, Question } from "~~/types/game";

const props = defineProps<{
  question: Question;
  modelValue: OptionKey | "";
  cooldownRemaining: number;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: OptionKey | ""];
  submit: [];
}>();

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value as OptionKey | ""),
});

const isLocked = computed(() => props.cooldownRemaining > 0);

function submit() {
  emit("submit");
}
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal-card">
      <h2 class="modal-title">{{ question.prompt }}</h2>

      <div class="options-list">
        <label
          v-for="option in question.options"
          :key="option.key"
          class="option-card"
          :class="{ selected: modelValue === option.key }"
        >
          <input
            v-model="localValue"
            type="radio"
            name="answer"
            :value="option.key"
            :disabled="isLocked"
          />
          <span
            ><strong>{{ option.key }})</strong> {{ option.text }}</span
          >
        </label>
      </div>

      <p v-if="cooldownRemaining > 0" class="error-text">
        Nepareiza atbilde. Mēģini vēlreiz pēc {{ cooldownRemaining }}...
      </p>

      <div class="modal-actions">
        <button
          class="primary-btn"
          :disabled="!localValue || isLocked"
          @click="submit"
        >
          Iesniegt atbildi
        </button>
      </div>
    </div>
  </div>
</template>
