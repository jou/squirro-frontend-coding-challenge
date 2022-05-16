import { beforeEach, describe, expect, it, vi } from "vitest";
import { useBookStores } from "~/hooks/useApiClient";
import ApiClient, { BookStoreAttributes, JsonApiResponse } from "~/api/Client";
import { renderHook } from "@testing-library/react";

vi.mock("~/api/Client");

describe("useBookStores()", () => {
    let apiClient: ApiClient;

    beforeEach(() => {
        apiClient = ApiClient.getDefault();
    });

    it("should be loading initially", async () => {
        const apiClientMocks = vi.mocked<ApiClient>(apiClient);
        apiClientMocks.fetchBookStores.mockReturnValue(
            new Promise<JsonApiResponse<BookStoreAttributes[]>>(() => {
                // make the promise not resolve
            }),
        );
        const { result } = renderHook(() => useBookStores(apiClient));

        expect(result.current.loading).toBe(true);
    });
});
