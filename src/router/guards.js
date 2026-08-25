import { useAuthStore } from "@/stores/auth";

export function authGuard(to) {
    const authStore = useAuthStore();
    
    if (!authStore.isAuthenticated && to.name !== "login") {
        return { name: "login" };
    }
    
    if (authStore.isAuthenticated && to.name === "login") {
        return { name: "form-request" };
    }

    return true;
}