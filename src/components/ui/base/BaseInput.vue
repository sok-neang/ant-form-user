<template>
  <div>
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <div :class="{ 'input-group': $slots.prepend || $slots.append }">
      <slot name="prepend"></slot>
      <el-date-picker
        v-if="type === 'date'"
        :id="id"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        type="date"
        :placeholder="placeholder || 'dd/mm/yyyy'"
        :disabled="disabled"
        :class="['w-100', 'custom-date-picker', { 'is-invalid': error }]"
        format="DD/MM/YYYY"
        value-format="YYYY-MM-DD"
        @blur="$emit('blur')"
      />
      <input
        v-else
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :class="['form-control', { 'is-invalid': error }]"
        :disabled="disabled"
        :required="required"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
      />
      <slot name="append"></slot>
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
  type: { type: String, default: "text" },
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
}

.form-control:focus {
  box-shadow: var(--shadow-primary) !important;
  border-color: var(--border-color-primary) !important;
  outline: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.form-control.is-invalid {
  border-color: var(--error-color) !important;
  background-image: none;
}

.form-control.is-invalid:focus {
  box-shadow: var(--shadow-error) !important;
  border-color: var(--error-color) !important;
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

:deep(.custom-date-picker.el-date-editor) {
  height: 50px !important;
}

:deep(.custom-date-picker .el-input__wrapper) {
  background-color: var(--input-bg);
  border: 1px solid var(--border-input) !important;
  box-shadow: none !important;
  border-radius: 8px;
  padding: 0;
  position: relative;
  width: 100%;
}

:deep(.custom-date-picker.is-invalid .el-input__wrapper) {
  border-color: var(--error-color) !important;
}

:deep(.custom-date-picker .el-input__wrapper.is-focus) {
  border-color: var(--border-color-primary) !important;
  box-shadow: var(--shadow-primary) !important;
}

:deep(.custom-date-picker.is-invalid .el-input__wrapper.is-focus) {
  border-color: var(--error-color) !important;
  box-shadow: var(--shadow-error) !important;
}

:deep(.custom-date-picker .el-input__inner) {
  color: var(--text-base);
  padding-left: 1rem;
  padding-right: 50px;
}

:deep(.custom-date-picker .el-input__prefix) {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 44px;
  border-left: 1px solid var(--border-input);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: var(--text-muted);
}

:deep(.custom-date-picker.is-invalid .el-input__prefix) {
  border-left-color: var(--error-color);
}

:deep(.custom-date-picker .el-input__suffix) {
  position: absolute;
  right: 50px;
}
</style>