<template>
  <div class="base-checkbox">
    <div class="form-check">
      <input
        class="form-check-input"
        :class="{ 'is-invalid': error }"
        type="checkbox"
        :id="id"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        @change="handleChange"
      />
      <label class="form-check-label" :for="id" v-if="label">
        {{ label }}
      </label>
    </div>
    <div
      v-if="error && showErrorMessage"
      class="invalid-feedback mt-2 d-flex align-items-center"
    >
      <i
        class="bi bi-exclamation-circle-fill me-1"
        style="font-size: 13px !important"
      ></i>
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: { type: [Boolean, Array], default: false },
  value: { type: [String, Number, Boolean, Object] },
  label: String,
  id: String,
  error: String,
  disabled: { type: Boolean, default: false },
  showErrorMessage: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "change"]);

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value);
  }
  return !!props.modelValue;
});

const handleChange = (event) => {
  const checked = event.target.checked;

  if (Array.isArray(props.modelValue)) {
    let newValue = [...props.modelValue];
    if (checked) {
      newValue.push(props.value);
    } else {
      newValue = newValue.filter((item) => item !== props.value);
    }
    emit("update:modelValue", newValue);
    emit("change", newValue);
  } else {
    emit("update:modelValue", checked);
    emit("change", checked);
  }
};
</script>

<style scoped>
.base-checkbox {
  margin-bottom: 0.5rem;
}

.form-check {
  display: flex;
  align-items: center;
}

.form-check-input {
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--border-input, #ced4da);
  border-radius: 4px;
  appearance: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin: 0;
}

.form-check-input:focus {
  box-shadow: var(--shadow-primary) !important;
}

.form-check-input:hover:not(:disabled) {
  border-color: var(--primary-color);
}

.form-check-input:focus-visible {
  outline: none;
  box-shadow: var(--shadow-base) !important;
  border-color: var(--primary-color);
}

.form-check-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.form-check-input:disabled {
  background-color: var(--bs-secondary-bg);
  cursor: not-allowed;
  opacity: 0.7;
}

.form-check-input.is-invalid {
  border-color: var(--error-color) !important;
}

.form-check-input.is-invalid:focus,
.form-check-input.is-invalid:focus-visible {
  box-shadow: var(--shadow-error) !important;
  border-color: var(--error-color) !important;
}

.form-check-label {
  margin-left: 8px;
  font-size: 16px;
  color: var(--text-base, #333) !important;
  cursor: pointer;
}
</style>