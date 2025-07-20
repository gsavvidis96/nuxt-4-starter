import axios from "axios";

export default defineNuxtPlugin({
  //   dependsOn: ["supabaseClient"],
  async setup() {
    const {
      public: { apiUrl },
    } = useRuntimeConfig();

    // const { $supabase } = useNuxtApp();

    const apiClient = axios.create({
      baseURL: apiUrl,
    });

    apiClient.interceptors.request.use(async (config) => {
      //   const {
      //     data: { session },
      //   } = await $supabase.auth.getSession();

      //   if (session) {
      //     config.headers["Authorization"] = `Bearer ${session.access_token}`;
      //   }

      return config;
    });

    return {
      provide: {
        apiClient,
      },
    };
  },
});
