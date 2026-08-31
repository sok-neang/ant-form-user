<template>
  <div class="base-file-upload">
    <label v-if="label" class="form-label">{{ label }}</label>
    <div 
      class="upload-dropzone"
      :class="{ 'is-invalid': error, 'is-dragover': isDragOver }"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input 
        type="file" 
        ref="fileInput" 
        class="d-none" 
        :accept="accept"
        @change="handleFileChange" 
      />
      <div class="upload-content text-center">
        <template v-if="!fileName">
          <i class="bi bi-cloud-arrow-up fs-2 text-primary mb-2"></i>
          <div class="upload-text">
            <span class="text-primary fw-semibold text-decoration-underline me-1">ចុចទីនេះ</span> 
            <span>ដើម្បីបញ្ជូលឯកសារ</span>
          </div>
        </template>
        <div v-else class="d-inline-flex align-items-center bg-white border rounded px-3 py-2 text-dark shadow-sm" @click.stop>
          <i class="bi bi-file-earmark-text text-danger me-2"></i>
          <span class="me-3">{{ fileName }}</span>
          <button type="button" class="btn-close ms-auto" style="font-size: 0.75rem;" @click.stop="handleRemove"></button>
        </div>
      </div>
    </div>
    <p v-if="rule" class="text-muted mt-3">{{ rule }}</p>
    <div v-if="error" class="invalid-feedback mt-2 d-flex align-items-center">
        <i class="bi bi-exclamation-circle-fill me-1" style="font-size: 13px !important"></i> {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  modelValue: { type: [File, String, Object], default: null },
  label: String,
  error: String,
  accept: { type: String, default: "image/*,.pdf" },
  rule: { type: String, default: "" },
  customFileName: { type: String, default: "ឯកសារដែលបានបញ្ជូល" }
});

const emit = defineEmits(['update:modelValue', 'change', 'remove']);

const fileInput = ref(null);
const isDragOver = ref(false);
const fileName = ref('');

const updateFileName = (val) => {
  if (!val) {
    fileName.value = '';
  } else if (val instanceof File) {
    fileName.value = val.name;
  } else if (typeof val === 'string') {
    const parts = val.split('/');
    const fileStr = parts[parts.length - 1] || '';
    const ext = fileStr.includes('.') ? fileStr.substring(fileStr.lastIndexOf('.')) : '';
    fileName.value = props.customFileName + ext;
  } else if (val.name) {
    fileName.value = val.name;
  } else {
    fileName.value = 'Uploaded File';
  }
};

watch(() => props.modelValue, (newVal) => {
  updateFileName(newVal);
});

onMounted(() => {
  updateFileName(props.modelValue);
});

const triggerFileInput = () => {
  fileInput.value.click();
};

const processFile = (file) => {
  if (file) {
    fileName.value = file.name;
    emit('update:modelValue', file);
    emit('change', file);
  }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  processFile(file);
};

const handleDrop = (e) => {
  isDragOver.value = false;
  const file = e.dataTransfer.files[0];
  processFile(file);
};

const handleRemove = () => {
  fileName.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  emit('remove');
  emit('update:modelValue', null);
  emit('change', null);
};
</script>

<style scoped>
.form-label {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 0.5rem;
}
.upload-dropzone {
  border: 1px dashed var(--border-color-primary);
  border-radius: 8px;
  padding: 2rem 1rem;
  background-color: var(--bg-body, #f4f4f4);
  cursor: pointer;
  transition: all 0.2s ease;
}
.upload-dropzone:hover, .upload-dropzone.is-dragover {
  border-color: var(--primary-color, #357867);
  background-color: var(--hover-color, #eff3ff61);
}
.upload-dropzone.is-invalid {
  border-color: #dc3545;
}
.text-primary {
  color: var(--primary-color, #357867) !important;
}
</style>
