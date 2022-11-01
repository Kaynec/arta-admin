import { acceptHMRUpdate, defineStore } from "pinia";

interface AdminInterface {
  name: "";
}

export const useAdminStore = defineStore(
  "admin",
  () => {
    const token = ref("");
    const admin = ref<AdminInterface | null>(null);
    const userOfStore = "admin";

    const isAuthenticated = computed(() => {
      if (token.value) return true;
      return false;
    });
    function setToken(newToken: string | "") {
      token.value = newToken;
    }

    function setAdmin(data: AdminInterface | null) {
      admin.value = data;
    }

    return {
      isAuthenticated,
      setToken,
      token,
      setAdmin,
      admin,
      userOfStore,
    };
  },
  {
    persist: true,
  }
);
