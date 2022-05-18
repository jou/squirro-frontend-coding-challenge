import ApiClient, { BookStoreAttributes, JsonApiResponse } from "~/api/Client";
import { useEffect, useState } from "react";

export interface ApiClientHookResult<DataType> {
    loading: boolean;
    error?: Error;
    data?: JsonApiResponse<DataType>;
    reload(): Promise<void>;
}

export function useApiClient(): ApiClient {
    return ApiClient.getDefault();
}

export function useBookStores(
    apiClient: ApiClient,
): ApiClientHookResult<BookStoreAttributes[]> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();
    const [data, setData] = useState<JsonApiResponse<BookStoreAttributes[]>>();

    async function fetchBookStores(silent = false) {
        if (!silent) {
            setLoading(true);
        }
        try {
            const response = await apiClient.fetchBookStores();
            setData(response);
        } catch (e) {
            if (e instanceof Error) {
                setError(e);
            } else {
                // TODO: Maybe better handling of that
                setError(new Error("Unknown error occured"));
            }
        } finally {
            if (!silent) {
                setLoading(false);
            }
        }
    }
    useEffect(() => {
        void fetchBookStores(false);
    }, []);

    return { loading, error, data, reload: () => fetchBookStores(true) };
}
