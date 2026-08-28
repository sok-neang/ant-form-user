import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./guards";

import Login from "@/views/auth/LoginView.vue";
import ExpiredLink from "@/views/error/ExpiredLinkView.vue"
import NotFound from "@/views/error/NotFoundView.vue"

import FormRequest from "@/views/FormRequestView.vue"
import FormResubmit from "@/views/ResubmitView.vue"
import FormSubmitted from "@/views/SubmittedView.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/form-request",
      name: "form-request",
      component: FormRequest,
      meta: {
        title: "Form Request",
      },
    },
    {
      path: "/form-resubmit",
      name: "form-resubmit",
      component: FormResubmit,
      meta: {
        title: "Form Resubmit",
      },
    },
    {
      path: "/form-submitted",
      name: "form-submitted",
      component: FormSubmitted,
      meta: {
        title: "Form Submitted",
      },
    },

    {
      path: "/",
      name: "login",
      component: Login,
      meta: {
        title: "Login",
      },
    },

    {
      path: "/expired-link",
      name: "expired-link",
      component: ExpiredLink,
      meta: {
        title: "Form Expired",
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

export default router;