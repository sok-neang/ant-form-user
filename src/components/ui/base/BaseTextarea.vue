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
                <i class="bi bi-exclamation-circle-fill me-1" style="font-size: 13px !important"></i> {{ error }}
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
/* .form-control{
    background-color: var(--input-bg);
    color: var(--text-base);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    resize: vertical;
} */
::placeholder{
    color: var(--text-muted);
}
/* .form-control:focus{
    border-color: var(--border-color-primary);
    box-shadow: var(--shadow-primary);
    background-color: var(--input-bg);
    outline: none;
} */
</style>
