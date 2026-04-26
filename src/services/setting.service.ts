import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface PlatformSetting {
    id: string;
    key: string;
    value: string;
}

export interface ServiceError {
    message: string;
}

export const settingService = {
    /**
     * Get all platform settings
     */
    getAllSettings: async function (
        token: string
    ): Promise<{ data: PlatformSetting[] | null; error: ServiceError | null }> {
        try {
            const res = await fetch(`${API_URL}/settings`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                cache: "no-store",
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(
                    errorData.message || `HTTP error! status: ${res.status}`
                );
            }

            const response = await res.json();
            return { data: response.data, error: null };
        } catch (err) {
            console.error("Error fetching settings:", err);
            return {
                data: null,
                error: {
                    message: err instanceof Error ? err.message : "Error fetching settings",
                },
            };
        }
    },

    /**
     * Update a platform setting
     */
    updateSetting: async function (
        token: string,
        key: string,
        value: string
    ): Promise<{ data: PlatformSetting | null; error: ServiceError | null }> {
        try {
            const res = await fetch(`${API_URL}/settings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ key, value }),
                credentials: "include",
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(
                    errorData.message || `HTTP error! status: ${res.status}`
                );
            }

            const response = await res.json();
            return { data: response.data, error: null };
        } catch (err) {
            console.error("Error updating setting:", err);
            return {
                data: null,
                error: {
                    message: err instanceof Error ? err.message : "Error updating setting",
                },
            };
        }
    },
};
