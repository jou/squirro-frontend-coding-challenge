import styled from "styled-components";
import { BookStoreAttributes } from "~/api/Client";
import { HTMLAttributes } from "react";
import { Avatar } from "~/components/Avatar";

const BookStoreItemWrapper = styled.div`
    display: flex;
    flex-direction: column;

    border: 1px gray solid;
    border-radius: 0.5rem;
    padding: 1rem;

    .book-store-item__main {
        display: flex;
    }

    .book-store-item__store-image {
        flex: 0 0 8rem;
        margin: 0 1rem 1rem 0;
    }

    .book-store-item__info {
        flex: 1;
    }

    .book-store-item__meta {
    }
`;

export interface BookStoreItemProps {
    bookStore: BookStoreAttributes;
}

export default function BookStoreItem({
    bookStore,
    ...wrapperProps
}: BookStoreItemProps & HTMLAttributes<HTMLDivElement>): JSX.Element {
    return (
        <BookStoreItemWrapper
            {...wrapperProps}
            className={`book-store-item ${wrapperProps.className}`}
        >
            <div className="book-store-item__main">
                <Avatar
                    alt={`Picture of ${bookStore.name}`}
                    className="book-store-item__store-image"
                    avatarUrl={bookStore.storeImage}
                />
                <div className="book-store-item__info">{bookStore.name}</div>
            </div>
            <div className="book-store-item__meta">
                {bookStore.establishmentDate}
            </div>
        </BookStoreItemWrapper>
    );
}
