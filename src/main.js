import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/css/main.css";

import App from "./App.vue";
import router from "./router";
import BaseButton from "./components/ui/base/BaseButton.vue";
import BaseInput from "./components/ui/base/BaseInput.vue";
import BaseSelect from "./components/ui/base/BaseSelect.vue";
import BaseCheckbox from "./components/ui/base/BaseCheckbox.vue";
import BaseRadio from "./components/ui/base/BaseRadio.vue";
import BaseTextarea from "./components/ui/base/BaseTextarea.vue";
import BaseFileUpload from "./components/ui/base/BaseFileUpload.vue";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(ElementPlus);

app.component("BaseButton", BaseButton);
app.component("BaseInput", BaseInput);
app.component("BaseSelect", BaseSelect);
app.component("BaseCheckbox", BaseCheckbox);
app.component("BaseRadio", BaseRadio);
app.component("BaseTextarea", BaseTextarea);
app.component("BaseFileUpload", BaseFileUpload);

app.mount("#app");