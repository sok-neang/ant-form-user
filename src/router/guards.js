import { useAuthStore } from "@/stores/auth";
import { useSubmissionsStore } from "@/stores/submissions";

export async function authGuard(to) {
    const authStore = useAuthStore();

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

    return true;

    

}