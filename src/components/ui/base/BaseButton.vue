<template>
    <button 
        :class="computedClasses" 
        :type="type" 
        :disabled="isDisabled || isLoading" 
        @click="handleClick">
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
        <slot></slot>
    </button>
</template>

<script setup>
    import { computed } from 'vue';
    
    const props = defineProps({
        variant: { type: String, default: "primary" },
        isLoading: { type: Boolean, default: false },
        isDisabled: { type: Boolean, default: false },
        type: { type: String, default: "button" },
    });

    const emit = defineEmits(["click"]);

    const customVariants = ['custom-btn', 'custom-primary', 'back-minimal'];
    
    const computedClasses = computed(() => {
        if (customVariants.includes(props.variant)) {
            return ['btn', props.variant];
        }
        return ['btn', `btn-${props.variant}`];
    });

    const handleClick = () => {
        if (!props.isDisabled && !props.isLoading) {
            emit("click");
        }
    };
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  cursor: pointer !important;
}

.btn:active:not(:disabled) {
  transform: scale(0.98);
}

.btn-primary {
  background-color: var(--primary-color, #357867) !important;
  border: 1px solid var(--primary-color, #357867) !important;
  color: white !important;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--secondary-color) !important;
  border-color: var(--secondary-color) !important;
  color: white !important;
}

.btn-primary:disabled {
  background-color: #6c9a8e !important;
  border-color: #6c9a8e !important;
  opacity: 0.7;
  cursor: not-allowed;
}   

/* Custom Variants */
.custom-primary {
  background-color: #ffffff;
  border: 1px solid #dadce0;
  border-radius: 24px;
  padding: 10px 24px;
  transition: background-color 0.2s, box-shadow 0.2s, border-color 0.2s;
  height: 50px;
  color: #3b4559;
}

.custom-primary:hover:not(:disabled) {
  border-color: var(--primary-color, #357867);
  color: var(--primary-color, #357867);
  background-color: #f8f9fa;
}
</style>