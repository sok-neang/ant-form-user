import { useAuthStore } from "@/stores/auth";
import { useSubmissionsStore } from "@/stores/submissions";

export async function authGuard(to) {
    const authStore = useAuthStore();
    const submissionsStore = useSubmissionsStore();

    // if not authenticated and trying to go to protected routes, go to login
    if (!authStore.isAuthenticated && to.name !== "login" && to.name !== "expired-link") {
        return { name: "login" };
    }

    // if not authenticated and trying to go to form submitted, go to login
    if (!authStore.isAuthenticated && to.name === "form-submitted") {
        return { name: "login" };
    }

    // if authenticated and trying to go to login, go to form request
    if (authStore.isAuthenticated && to.name === "login") {
        return { name: "form-request" };
    }

    // If user not yet submitted form and try to go to form submitted
    if (authStore.isAuthenticated && to.name === "form-submitted" && !submissionsStore.isSubmitted) {
        return { name: "form-request" };
    }

    // If user already submitted form and try to go to form request
    if (authStore.isAuthenticated && to.name === "form-request" && submissionsStore.isSubmitted) {
        return { name: "form-submitted" };
    }

    return true;

}