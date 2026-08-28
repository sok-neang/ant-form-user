import { useAuthStore } from "@/stores/auth";
import { useSubmissionsStore } from "@/stores/submissions";

export async function authGuard(to) {
    const authStore = useAuthStore();
    const submissionsStore = useSubmissionsStore();

    // If not authenticated and trying to go to protected routes, go to login
    if (!authStore.isAuthenticated && to.name !== "login" && to.name !== "expired-link") {
        return { name: "login" };
    }

    // If authenticated and trying to go to login, redirect based on submission status
    if (authStore.isAuthenticated && to.name === "login") {
        return { name: "form-request" };
    }

    // If trying to access form-request
    // if (to.name === "form-request" && authStore.isAuthenticated) {
    //     if (submissionsStore.submissionStatus !== "DRAFT") {
    //         return { name: "form-resubmit" };
    //     }
    // }

    // If trying to access form-resubmit, check if user is authenticated
    if (to.name === "form-resubmit" && !authStore.isAuthenticated) {
        return { name: "login" };
    }

    // If token expired, redirect to expired-link page
    if (authStore.isTokenExpired && to.name !== "expired-link" && to.name !== "login") {
        return { name: "expired-link" };
    }

    // If on expired-link page and user clicks login again, clear the expired state
    if (to.name === "login" && authStore.isTokenExpired) {
        authStore.setTokenExpired(false);
    }

    return true;
}