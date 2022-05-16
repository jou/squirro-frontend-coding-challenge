import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import BookStoreItem from "~/components/BookStoreItem";
import { AwesomeBookStore } from "~/tests/fixtures/BookStores";

describe("<BookStoreItem>", () => {
    // Not much interesting happening here so far, a snapshot is enough for now
    it("should match snapshot", () => {
        const { container } = render(
            <BookStoreItem bookStore={AwesomeBookStore} />,
        );

        expect(container).toMatchSnapshot();
    });
});
