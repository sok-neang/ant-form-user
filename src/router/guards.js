import { useAuthStore } from "@/stores/auth";
import { useSubmissionsStore } from "@/stores/submissions";

export async function authGuard(to) {
    const authStore = useAuthStore();
    const submissionsStore = useSubmissionsStore();

    if (!authStore.isAuthenticated && to.name !== "login" && to.name !== "expired-link") {
        return { name: "login" };
    }

    if (!authStore.isAuthenticated && to.name === "form-submitted") {
        return { name: "login" };
    }

    if (authStore.isAuthenticated && to.name === "login") {
        return { name: "form-request" };
    }

    if (authStore.isAuthenticated && to.name === "form-submitted" && !submissionsStore.isSubmitted) {
        return { name: "form-request" };
    }

    if (authStore.isAuthenticated && to.name === "form-request" && submissionsStore.isSubmitted) {
        return { name: "form-submitted" };
    }

    return true;

}