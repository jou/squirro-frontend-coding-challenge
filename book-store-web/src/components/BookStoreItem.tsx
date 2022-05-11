import styled from "styled-components";
import { BookStoreAttributes } from "~/api/Client";
import { HTMLAttributes } from "react";
import { Avatar } from "~/components/Avatar";
import BestsellerTable from "~/components/BestsellerTable";
import CountryFlag from "~/components/CountryFlag";
import { parseISO } from "date-fns";
import { DisplayDate } from "~/components/DisplayDate";
import { screens } from "~/utils/Styling";

const RATINGS = [1, 2, 3, 4, 5];

const BookStoreItemWrapper = styled.div`
    display: flex;
    flex-direction: column;

    border: 1px solid var(--color-slate-500);
    border-radius: 0.5rem;
    padding: 1rem;

    .book-store-item__main {
        display: grid;
        grid-template-columns: 2rem auto;
        grid-gap: 0.5rem;
        align-items: start;

        @media ${screens.md} {
            grid-template-columns: 3rem auto;
            grid-gap: 0.75rem;
        }

        @media ${screens.lg} {
            grid-template-columns: 8rem auto;
            grid-gap: 1rem;
        }
    }

    .book-store-item__store-image {
        width: 100%;

        @media ${screens.lg} {
            grid-row: 1 / span 2;
        }
    }

    .book-store-item__info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .book-store-item__title {
        margin: 0;
        font-size: 1.25rem;
    }

    .book-store-item__rating {
        font-size: 1.25rem;
    }

    @media ${screens.md} {
        .book-store-item__title,
        .book-store-item__rating {
            font-size: 1.75rem;
        }
    }

    @media ${screens.lg} {
        .book-store-item__title,
        .book-store-item__rating {
            font-size: 2rem;
        }
    }

    .book-store-item__bestseller {
        grid-column: 1 / span 2;

        @media ${screens.lg} {
            grid-column: 2 / span 1;
        }
    }

    .book-store-item__meta {
        margin-top: 0.5rem;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .book-store-item__flag {
        font-size: 1.5rem;
    }
`;

export interface BookStoreItemProps {
    bookStore: BookStoreAttributes;
}

export default function BookStoreItem({
    bookStore,
    ...wrapperProps
}: BookStoreItemProps & HTMLAttributes<HTMLDivElement>): JSX.Element {
    const ratingStars: string = RATINGS.map((rating) => {
        if (bookStore.rating >= rating) {
            return "★";
        }

        return "☆";
    }).join("");

    const establishmentDate = parseISO(bookStore.establishmentDate);
    const websiteUrl = new URL(bookStore.website);

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
                <div className="book-store-item__info">
                    <h1 className="book-store-item__title">{bookStore.name}</h1>
                    <span className="book-store-item__rating">
                        {ratingStars}
                    </span>
                </div>
                <BestsellerTable
                    className="book-store-item__bestseller"
                    books={bookStore.books?.data}
                />
            </div>
            <div className="book-store-item__meta">
                <span>
                    {/* Establishment date is supplied by the API as midnight UTC. Not adjusting
                        for time zone when formatting will net wrong dates displayed when the
                        client's UTC offset is negative. */}
                    <DisplayDate date={establishmentDate} timeZone="UTC" /> -{" "}
                    <a href={bookStore.website}>{websiteUrl.host}</a>
                </span>
                <CountryFlag
                    className="book-store-item__flag"
                    countryCode={bookStore.countries.data.code}
                />
            </div>
        </BookStoreItemWrapper>
    );
}
