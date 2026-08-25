<template>
  <div class="base-radio">
    <div class="form-check">
      <input 
        class="form-check-input"
        type="radio" 
        :id="id" 
        :name="name"
        :value="value"
        :checked="modelValue === value"
        :disabled="disabled"
        @change="$emit('update:modelValue', value)"
      />
      <label class="form-check-label" :for="id" v-if="label">
        {{ label }}
      </label>
    </div>
    <div v-if="error" class="invalid-feedback mt-2 d-flex align-items-center">
        <i class="bi bi-exclamation-circle-fill me-1" style="font-size: 13px !important"></i> {{ error }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [String, Number, Boolean], default: '' },
  value: { type: [String, Number, Boolean], required: true },
  label: String,
  name: String,
  id: String,
  error: String,
  disabled: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
.base-radio {
  margin-bottom: 0.5rem;
}

.form-check {
  display: flex;
  align-items: center;
}

.form-check-input {
  width: 18px;
  height: 18px;
  color: var(--primary-color);
  background-color: var(--input-bg);
  border: 1.5px solid var(--border-input);
  border-radius: 50%;
  appearance: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin: 0;
}

.form-check-input:focus{
    box-shadow: var(--shadow-primary) !important;
}

.form-check-input:hover:not(:disabled) {
  border-color: var(--primary-color);
}

.form-check-input:focus-visible {
  outline: none;
  box-shadow: var(--shadow-primary);
  border-color: var(--primary-color);
}

.form-check-input:checked {
  border-color: var(--primary-color);
  background-color: var(--input-bg);
}

.form-check-input:checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--primary-color);
}

.form-check-input:disabled {
  background-color: var(--bs-secondary-bg);
  cursor: not-allowed;
  opacity: 0.7;
}

.form-check-label {
  margin-left: 8px;
  font-size: 16px;
  color: var(--text-base);
  cursor: pointer;
}
</style>