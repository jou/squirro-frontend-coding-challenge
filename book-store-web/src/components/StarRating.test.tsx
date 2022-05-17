import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render } from "@testing-library/react";
import StarRating from "~/components/StarRating";
import mock from "~/api/__mocks__/Client";

describe("<StarRating>", () => {
    it("should render the rating with star characters", () => {
        const { getAllByText } = render(
            <StarRating rating={3} onRatingSelected={() => {}} />,
        );

        expect(getAllByText("★").length).toEqual(3);
        expect(getAllByText("☆").length).toEqual(2);
    });

    it("should render the hovered star as the current rating", () => {
        const { getAllByText, getByTestId } = render(
            <StarRating rating={3} onRatingSelected={() => {}} />,
        );

        act(() => {
            // Simulate hover on the fourth star
            fireEvent(
                getByTestId("star-rating__star-4"),
                new MouseEvent("mouseover", {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        expect(getAllByText("★").length).toEqual(4);
        expect(getAllByText("☆").length).toEqual(1);
    });

    it("should call the callback with the clicked rating", () => {
        const mockHandler = vi.fn();
        const { getByTestId } = render(
            <StarRating rating={3} onRatingSelected={mockHandler} />,
        );

        act(() => {
            // Simulate click on the fourth star
            fireEvent(
                getByTestId("star-rating__star-4"),
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                }),
            );
        });

        expect(mockHandler).toHaveBeenCalledOnce();
        expect(mockHandler).toHaveBeenCalledWith(4);
    });
});
