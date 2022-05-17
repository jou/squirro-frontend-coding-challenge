import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClientHookResult, useBookStores } from "~/hooks/useApiClient";
import ApiClient, { BookStoreAttributes, JsonApiResponse } from "~/api/Client";
import { act, renderHook } from "@testing-library/react";
import { BookStores } from "~/tests/fixtures/BookStores";

vi.mock("~/api/Client");

describe("useBookStores()", () => {
    let apiClient: ApiClient;

    async function assertHookResult(
        resultPromise: Promise<JsonApiResponse<BookStoreAttributes[]>>,
        verifier: (
            hookResult: ApiClientHookResult<BookStoreAttributes[]>,
        ) => void,
    ) {
        vi.mocked(apiClient).fetchBookStores.mockReturnValue(resultPromise);

        const renderResult = renderHook(() => useBookStores(apiClient));

        await act(async () => {
            try {
                await resultPromise;
            } catch {
                // do nothing, we don't care about the failure at this point
            }
        });

        verifier(renderResult.result.current);
    }

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

    it("should not be loading when request was successful", async () => {
        const fetchPromise = Promise.resolve<
            JsonApiResponse<BookStoreAttributes[]>
        >({
            data: BookStores,
        });

        await assertHookResult(fetchPromise, (result) => {
            expect(result.loading).toBe(false);
        });
    });

    it("should return data it loaded", async () => {
        const fetchPromise = Promise.resolve<
            JsonApiResponse<BookStoreAttributes[]>
        >({
            data: BookStores,
        });

        await assertHookResult(fetchPromise, (result) => {
            expect(result.data?.data).toEqual(BookStores);
        });
    });

    it("should not be loading when request failed", async () => {
        const fetchPromise = Promise.reject();

        await assertHookResult(fetchPromise, (result) => {
            expect(result.loading).toBe(false);
        });
    });

    it("should have error populated when promise rejects", async () => {
        const expectedError = new Error("Some error");
        const fetchPromise = Promise.reject(expectedError);

        await assertHookResult(fetchPromise, (result) => {
            expect(result.error).toBe(expectedError);
        });
    });
});
