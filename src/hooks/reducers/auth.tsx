;
import { EnvConfig } from "@/utils/constants/env.config";
import { clearLocalStorage, getLocalStorageItem, removeFromLocalStorage, setLocalStorageItem } from "@/utils/functions/local-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { api: apiUrl } = EnvConfig();

// Constantes para evitar errores de escritura
const TOKEN_KEY = "token";
const USER_ROLE_KEY = "user-role";
const USER_ID_KEY = "user-id";

export const auth = createApi({
    reducerPath: "auth",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            const token = getLocalStorageItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        postUserRegister: builder.mutation({
            query: (data) => ({
                url: "v1/users/register",
                method: "POST",
                body: data,
            }),
        }),
        postUserLogin: builder.mutation({
            query: (credentials) => ({
                url: "Auth/login",
                method: "POST",
                body: credentials,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    const { data: responseData } = await queryFulfilled;

                    if (responseData.token) {
                        // Almacenar en localStorage para fácil acceso del cliente
                        setLocalStorageItem(TOKEN_KEY, responseData.token);
                        setLocalStorageItem(USER_ROLE_KEY, responseData.rol);
                        setLocalStorageItem(USER_ID_KEY, responseData.id);
                    }
                } catch (error) {
                    console.error("Error during login:", error);
                    // Podrías dispatchar una acción de error aquí si es necesario
                }
            },
        }),
        postLogut: builder.mutation({
            query: () => ({
                url: `Auth/logout`,
                method: "POST",
                responseHandler: (response) => response.text(),
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    // Limpiar localStorage
                    clearLocalStorage();
                } catch (error) {
                    console.error("Error during logout:", error);
                }
            },
        }),
    }),
});

export const {
    usePostLogutMutation,
    usePostUserLoginMutation,
    usePostUserRegisterMutation,
} = auth;
