import { sortBy } from "lodash";
import styled from "styled-components";
import { BookAttributes } from "~/api/Client";
import { TableHTMLAttributes, useMemo } from "react";

const TOP_LIST_SIZE = 2;

const BestsellerTableWrapper = styled.table`
    overflow-x: scroll;

    &,
    th,
    td {
        border: 1px solid var(--color-slate-300);
        border-collapse: collapse;
    }

    th {
        text-align: left;
    }

    td,
    th {
        padding: 0.25rem;
    }

    .bestseller-table__author-col {
        width: 33.33333%;
    }
`;

export interface BestsellerTableProps {
    books?: BookAttributes[];
}

export default function BestsellerTable({
    books,
    ...tableProps
}: BestsellerTableProps & TableHTMLAttributes<HTMLTableElement>): JSX.Element {
    const topList = useMemo(() => {
        if (!books) {
            return [];
        }

        return sortBy(books, (book) => book.copiesSold)
            .reverse()
            .slice(0, TOP_LIST_SIZE);
    }, [books]);

    return (
        <BestsellerTableWrapper
            {...tableProps}
            className={`bestseller-table ${tableProps.className}`}
        >
            <colgroup>
                <col className="bestseller-table__title-col" />
                <col className="bestseller-table__author-col" />
            </colgroup>
            <thead>
                <tr>
                    <th colSpan={2}>Best-selling books</th>
                </tr>
            </thead>
            <tbody>
                {topList.length > 0 ? (
                    topList.map((book) => {
                        return (
                            <tr
                                key={book.id}
                                data-testid="bestseller-table__row"
                            >
                                <td>{book.name}</td>
                                <td>
                                    {book.author?.data.fullName ??
                                        "Unknown Author"}
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td>No data available</td>
                        <td></td>
                    </tr>
                )}
            </tbody>
        </BestsellerTableWrapper>
    );
}
