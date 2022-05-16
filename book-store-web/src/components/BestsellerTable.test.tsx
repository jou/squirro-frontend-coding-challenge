import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import BestsellerTable from "~/components/BestsellerTable";
import {
    AllBooks,
    BestsellerFixture,
    SampleBook,
    BookWithoutAuthor,
} from "~/tests/fixtures/Books";

describe("<BestsellerTable>", () => {
    it("should show that no data is available if no books are provided", () => {
        const { getByText } = render(<BestsellerTable books={[]} />);

        expect(getByText("No data available")).not.toBeNull();
    });

    it("should show book name", () => {
        const { getByText } = render(<BestsellerTable books={[SampleBook]} />);

        expect(getByText(SampleBook.name)).not.toBeNull();
    });

    it("should show book author", () => {
        const { getByText } = render(<BestsellerTable books={[SampleBook]} />);

        expect(
            getByText(
                SampleBook.author?.data.fullName ??
                    "__POTENTIALLY_BROKEN_TEST__",
            ),
        ).not.toBeNull();
    });

    it("should indicate that author information is missing", () => {
        const { getByText } = render(
            <BestsellerTable books={[BookWithoutAuthor]} />,
        );

        expect(getByText("Unknown Author")).not.toBeNull();
    });

    it("should show top two books", () => {
        const expectedBestsellers = BestsellerFixture;

        const { getByText, queryAllByTestId } = render(
            <BestsellerTable books={AllBooks} />,
        );

        expect(queryAllByTestId("bestseller-table__row").length).toEqual(
            expectedBestsellers.length,
        );

        for (const bestseller of expectedBestsellers) {
            expect(getByText(bestseller.name)).not.toBeNull();
        }
    });
});
