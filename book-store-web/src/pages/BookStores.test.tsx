import { describe, expect, it, vi } from "vitest";
import { useBookStores } from "~/hooks/useApiClient";
import { render } from "@testing-library/react";
import BookStores from "~/pages/BookStores";

vi.mock("~/hooks/useApiClient", async () => {
    const actualModule: Object = await vi.importActual("~/hooks/useApiClient");
    return {
        ...actualModule,
        useBookStores: vi.fn(),
    };
});

describe("<BookStores>", () => {
    it("should indicate that it is loading", () => {
        const expectedText = "loading…";
        vi.mocked(useBookStores).mockReturnValue({
            loading: true,
        });

        const { getByText } = render(<BookStores />);

        expect(getByText(expectedText)).toBeDefined();
    });

    it("should display error message if request fails", () => {
        const expectedText = "OH NOES!";
        vi.mocked(useBookStores).mockReturnValue({
            loading: false,
            error: new Error(expectedText),
        });

        const { getByText } = render(<BookStores />);

        expect(getByText(expectedText)).toBeDefined();
    });
});
