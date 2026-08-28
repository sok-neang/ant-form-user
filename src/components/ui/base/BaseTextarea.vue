<template>
  <div>
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <div>
      <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :class="['form-control', { 'is-invalid': error }]"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
      ></textarea>
      <div v-if="error" class="invalid-feedback mt-2 d-flex align-items-center">
        <i
          class="bi bi-exclamation-circle-fill me-1"
          style="font-size: 13px !important"
        ></i>
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  id: String,
  rows: { type: [Number, String], default: 4 },
  error: String,
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "blur"]);
</script>

<style scoped>
label {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 0.5rem;
}

.form-control {
  padding: 10px 16px;
  border: 1.5px solid var(--border-input) !important;
  border-radius: 8px;
  color: var(--text-base);
  resize: vertical;
  font-family: inherit;
}

.form-control:focus {
  border-color: var(--border-color-primary) !important;
  box-shadow: var(--shadow-primary) !important;
  background-color: var(--input-bg);
  outline: none;
}

.form-control.is-invalid {
  border-color: var(--error-color) !important;
  background-image: none;
}

.form-control.is-invalid:focus {
  border-color: var(--error-color) !important;
  box-shadow: var(--shadow-error) !important;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--error-color);
}

::placeholder {
  color: var(--text-muted);
}
</style>
