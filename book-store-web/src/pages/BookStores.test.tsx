import { describe, expect, it, vi } from "vitest";
import { useApiClient, useBookStores } from "~/hooks/useApiClient";
import { act, fireEvent, render } from "@testing-library/react";
import BookStores from "~/pages/BookStores";
import { AwesomeBookStore } from "~/tests/fixtures/BookStores";
import ApiClient from "~/api/Client";
import { forceCast } from "~/utils/Types";
import { SampleBook } from "~/tests/fixtures/Books";

vi.mock("~/hooks/useApiClient", async () => {
    const actualModule: Object = await vi.importActual("~/hooks/useApiClient");
    return {
        ...actualModule,
        useApiClient: vi.fn(),
        useBookStores: vi.fn(),
    };
});

describe("<BookStores>", () => {
    it("should indicate that it is loading", () => {
        const expectedText = "loading…";
        vi.mocked(useBookStores).mockReturnValue({
            loading: true,
            reload: vi.fn(),
        });

        const { getByText } = render(<BookStores />);

        expect(getByText(expectedText)).toBeDefined();
    });

    it("should display error message if request fails", () => {
        const expectedText = "OH NOES!";
        vi.mocked(useBookStores).mockReturnValue({
            loading: false,
            error: new Error(expectedText),
            reload: vi.fn(),
        });

        const { getByText } = render(<BookStores />);

        expect(getByText(expectedText)).toBeDefined();
    });

    it("should render the book's title", () => {
        const expectedText = AwesomeBookStore.name;

        vi.mocked(useBookStores).mockReturnValue({
            loading: false,
            reload: vi.fn(),
            data: {
                data: [AwesomeBookStore],
            },
        });

        const { getByText } = render(<BookStores />);

        expect(getByText(expectedText)).toBeDefined();
    });

    it("should update rating when star is clicked", async () => {
        const updater = vi.fn();
        const reloadFinished = Promise.resolve();
        vi.mocked(useApiClient).mockReturnValue(
            forceCast<ApiClient>({
                updateBookStoreRating: updater,
            }),
        );
        vi.mocked(useBookStores).mockReturnValue({
            loading: false,
            reload: vi.fn().mockReturnValue(reloadFinished),
            data: {
                data: [AwesomeBookStore],
            },
        });

        const { getByTestId } = render(<BookStores />);

        await act(async () => {
            fireEvent(
                getByTestId("star-rating__star-4"),
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                }),
            );
            await reloadFinished;
        });

        expect(updater).toHaveBeenCalledWith(SampleBook.id, 4);
    });
});
