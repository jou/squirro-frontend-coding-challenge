import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { BookStores } from "~/tests/fixtures/BookStores";
import BookStoreList from "~/components/BookStoreList";

describe("<BookStoreList>", () => {
    it("should render an item for each book store", () => {
        const { getAllByTestId } = render(
            <BookStoreList bookStores={BookStores} />,
        );

        expect(getAllByTestId("book-store-list__item").length).toEqual(
            BookStores.length,
        );
    });
});
