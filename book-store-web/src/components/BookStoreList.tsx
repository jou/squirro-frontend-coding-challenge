import { BookStoreAttributes } from "~/api/Client";
import { HTMLAttributes } from "react";
import styled from "styled-components";
import BookStoreItem from "~/components/BookStoreItem";

export interface BookStoreListProps {
    bookStores: BookStoreAttributes[];
    onRatingSelected(bookStore: BookStoreAttributes, newRating: number): void;
}

const BookStoreListWrapper = styled.div`
    padding: 1rem 1rem 0;
    display: flex;
    flex-direction: column;
    .book-store-list__item {
        margin: 0 0 1rem;
    }
`;

export default function BookStoreList({
    bookStores,
    onRatingSelected,
    ...containerProps
}: BookStoreListProps & HTMLAttributes<HTMLDivElement>): JSX.Element {
    return (
        <BookStoreListWrapper
            {...containerProps}
            className={`book-store-list ${containerProps.className ?? ""}`}
        >
            {bookStores.map((bookStore) => (
                <BookStoreItem
                    key={bookStore.id}
                    className="book-store-list__item"
                    data-testid="book-store-list__item"
                    bookStore={bookStore}
                    onRatingSelected={onRatingSelected}
                />
            ))}
        </BookStoreListWrapper>
    );
}
