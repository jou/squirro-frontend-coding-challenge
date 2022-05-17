import styled from "styled-components";
import { HTMLAttributes, useState } from "react";

export interface StarRatingProps {
    rating: number;
    onRatingSelected(newRating: number): void;
}

const MAX_RATING = 5;

const StarRatingWrapper = styled.span`
    &:hover {
        color: var(--color-violet-900);
    }

    .star-rating__star {
        cursor: pointer;
    }
`;

export default function StarRating({
    rating,
    onRatingSelected,
    ...spanProps
}: StarRatingProps & HTMLAttributes<HTMLSpanElement>): JSX.Element {
    const [hoveredRating, setHoveredRating] = useState<number>();
    const stars: JSX.Element[] = [];
    // If a star is hovered, use the hovered score as display store, otherwise
    // use the provided score.
    const displayRating = hoveredRating ?? rating;
    for (let i = 1; i <= MAX_RATING; i++) {
        stars.push(
            <span
                key={i}
                className="star-rating__star"
                data-testid={`star-rating__star-${i}`}
                role="button"
                onMouseOver={() => setHoveredRating(i)}
                onClick={() => onRatingSelected(i)}
            >
                {i <= displayRating ? "★" : "☆"}
            </span>,
        );
    }

    return (
        <StarRatingWrapper
            {...spanProps}
            className={`star-rating ${spanProps.className}`}
            onMouseOut={() => setHoveredRating(undefined)}
        >
            {stars}
        </StarRatingWrapper>
    );
}
