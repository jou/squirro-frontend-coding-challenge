import ApiClient, { BookStoreAttributes, JsonApiResponse } from "../api/Client";
import { useEffect, useState } from "react";

export interface ApiClientHookResult<DataType> {
    loading: boolean;
    error?: Error | null;
    data?: JsonApiResponse<DataType> | null;
}

export function useApiClient(): ApiClient {
    return ApiClient.getDefault();
}

export function useBookStores(
    apiClient: ApiClient,
): ApiClientHookResult<BookStoreAttributes[]> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<JsonApiResponse<
        BookStoreAttributes[]
    > | null>(null);

    useEffect(() => {
        async function fetchBookStores() {
            setLoading(true);
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
                setLoading(false);
            }
        }

        void fetchBookStores();
    }, []);

    return { loading, error, data };
}
