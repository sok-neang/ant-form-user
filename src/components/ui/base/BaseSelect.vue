<template>
  <div class="base-select-wrapper" ref="container">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <div class="d-flex w-100 align-items-stretch">
        <div class="base-select flex-grow-1">
            <div 
                :id="id"
                class="select-trigger" 
                :class="{ 'is-open': isOpen, 'is-disabled': disabled, 'is-invalid': error, 'rounded-end-0': clearable }"
                @click="toggle"
                tabindex="0"
                @keydown.enter.prevent="toggle"
                @keydown.space.prevent="toggle"
                @keydown.down.prevent="isOpen = true"
                @keydown.esc.prevent="isOpen = false"
            >
                <span class="selected-label" :class="{'text-muted': !selectedOption && placeholder}">
                    {{ selectedLabel }}
                </span>
                <svg class="chevron" :class="{'is-rotated': isOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>

            <transition name="dropdown">
                <div v-if="isOpen && !disabled" class="options-list">
                    <div 
                        v-for="option in normalizedOptions" 
                        :key="option.value"
                        class="option-item"
                        :class="{ 'is-selected': modelValue === option.value }"
                        @click.stop="select(option)"
                    >
                        {{ option.label }}
                    </div>
                </div>
            </transition>
        </div>
        <div v-if="clearable" class="clear-btn" @click.stop="select('')">
            <i class="bi bi-x fs-5"></i>
        </div>
    </div>
    <div v-if="error" class="invalid-feedback mt-2 d-flex align-items-center">
        <i class="bi bi-exclamation-circle-fill me-1" style="font-size: 13px !important"></i> {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    options: {
        type: Array, 
        required: true,
        default: () => []
    },
    placeholder: {
        type: String,
        default: 'សូមជ្រើសរើសជម្រើសណាមួយ'
    },
    label: String,
    id: String,
    error: String,
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'blur'])

const isOpen = ref(false)
const container = ref(null)

const normalizedOptions = computed(() => {
  return props.options.map(opt => {
    if (typeof opt === 'object' && opt !== null && 'label' in opt && 'value' in opt) {
      return opt
    }
    return { label: opt, value: opt }
  })
})

const selectedOption = computed(() => {
  return normalizedOptions.value.find(o => o.value === props.modelValue)
})

const selectedLabel = computed(() => {
  if (props.modelValue === '') return props.placeholder
  return selectedOption.value ? selectedOption.value.label : props.placeholder
})

const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value
}

const select = (option) => {
  if (props.disabled) return;
  const val = typeof option === 'string' ? option : option.value
  emit('update:modelValue', val)
  isOpen.value = false
  emit('blur')
}

const handleClickOutside = (e) => {
  if (container.value && !container.value.contains(e.target)) {
    if (isOpen.value) {
        isOpen.value = false
        emit('blur')
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.base-select-wrapper {
  position: relative;
  width: 100%;
}

.form-label {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 0.5rem;
}

.base-select {
  position: relative;
  width: 100%;
  user-select: none;
}

.select-trigger:focus,
.select-trigger:focus-visible {
  box-shadow: var(--shadow-primary) !important;
  border-color: var(--border-color-primary) !important;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border: 1.5px solid var(--border-input);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--text-base);
  outline: none;
}

.select-trigger:hover:not(.is-disabled) {
  border-color: var(--text-muted);
}

.select-trigger.is-open {
  box-shadow: var(--shadow-primary) !important;
  border-color: var(--border-color-primary) !important;
  background-color: var(--input-bg);
}

.select-trigger.is-invalid {
  border-color: var(--error-color) !important;
}

.select-trigger.is-invalid:focus,
.select-trigger.is-invalid:focus-visible,
.select-trigger.is-invalid.is-open {
  border-color: var(--error-color) !important;
  box-shadow: var(--shadow-error) !important;
}

.select-trigger.is-disabled {
  background-color: var(--bs-secondary-bg);
  color: var(--text-muted);
  cursor: not-allowed;
  opacity: 0.8;
}

.text-muted {
  color: var(--text-muted);
}

.chevron {
  width: 18px;
  height: 18px;
  margin-left: 10px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease;
  color: var(--text-muted);
}

.chevron.is-rotated {
  transform: rotate(180deg);
  color: var(--color-primary);
}

.options-list {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--bg-card);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  z-index: 50;
  max-height: 250px;
  overflow-y: auto;
  padding: 6px;
  
  scrollbar-width: thin;
  scrollbar-color: var(--text-muted) transparent;
}


.option-item {
  padding: 10px 14px;
  color: var(--text-base);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2px;
}

.option-item:last-child {
  margin-bottom: 0;
}

.option-item:hover {
  background-color: var(--hover-color);
  color: var(--color-primary);
}

.option-item.is-selected {
  background-color: var(--badge-admin-bg);
  color: var(--color-primary);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px; /* Fixed width to make it square-like */
  border: 1px solid var(--border-input);
  border-left: none;
  border-radius: 0 8px 8px 0;
  background-color: var(--input-bg);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background-color: var(--bs-secondary-bg);
  color: var(--color-text);
}
</style>
