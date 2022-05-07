import { BookStoreAttributes } from "~/api/Client";
import { HTMLAttributes } from "react";

export interface BookStoreListProps {
    bookStores: BookStoreAttributes[];
}

export default function BookStoreList({
    bookStores,
    ...containerProps
}: BookStoreListProps & HTMLAttributes<HTMLDivElement>): JSX.Element {
    return (
        <div {...containerProps}>
            {bookStores.map((bookStore) => (
                <div key={bookStore.id}>{bookStore.name}</div>
            ))}
        </div>
    );
}
