import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./guards";

import Login from "@/views/auth/LoginView.vue";
import ExpiredLink from "@/views/error/ExpiredLinkView.vue"
import NotFound from "@/views/error/NotFoundView.vue"

import FormRequest from "@/views/FormRequestView.vue"
import FormSubmitted from "@/views/SubmittedView.vue"
import FormResubmit from "@/views/ResubmitView.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/form-request",
      name: "form-request",
      component: FormRequest,
      meta: {
        title: "ពាក្យស្នើរសុំ",
      },
    },
    {
      path: "/form-submitted",
      name: "form-submitted",
      component: FormSubmitted,
      meta: {
        title: "ពាក្យស្នើរសុំបានបញ្ជូន",
      },
    },
    {
      path: "/form-resubmit",
      name: "form-resubmit",
      component: FormResubmit,
      meta: {
        title: "ពាក្យស្នើរសុំ",
      },
    },

    {
      path: "/",
      name: "login",
      component: Login,
      meta: {
        title: "ចូលគណនី",
      },
    },

    {
      path: "/expired-link",
      name: "expired-link",
      component: ExpiredLink,
      meta: {
        title: "ពាក្យស្នើរសុំផុតកំណត់",
      },
    },

    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFound,
      meta: {
        title: "404 Not Found",
      },
    },
  ],
});

router.beforeEach(authGuard);
router.afterEach((to) => {
  const title = to.meta.title;

  document.title = title
    ? `${title} | ANT-Form`
    : "ANT Scholarship";
});

export default router;