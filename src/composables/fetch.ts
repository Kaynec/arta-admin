import { createFetch } from "@vueuse/core";

// export const BASE_URL = "http://185.88.154.155:8000/";
export const BASE_URL = "http://localhost:3004/";

export const useAdminFetch = createFetch({
  baseUrl: BASE_URL,
  options: {
    timeout: 1200000,
    async beforeFetch({ options }: { options: { headers: string } }) {
      const myToken: string = useAdminStore()?.token;
      myToken && ((options.headers as any)!.Authorization = `JWT ${myToken}`);

      return { options };
    },
  },

  fetchOptions: { mode: "cors" },
});
