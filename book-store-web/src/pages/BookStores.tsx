import { omit } from "lodash";
import { useMemo, useState } from "react";
import { useApiClient, useBookStores } from "~/hooks/useApiClient";
import BookStoreList from "~/components/BookStoreList";
import { BookStoreAttributes } from "~/api/Client";

type PendingUpdate = Partial<BookStoreAttributes>;

export default function BookStores(): JSX.Element {
    const apiClient = useApiClient();
    const [pendingUpdates, setPendingUpdates] = useState<
        Record<string, PendingUpdate>
    >({});
    const { loading, error, data: apiData, reload } = useBookStores(apiClient);

    const bookStores = useMemo(() => {
        return (
            apiData?.data.map((bookStore) => {
                const pendingUpdate = pendingUpdates[bookStore.id];
                if (pendingUpdate) {
                    return {
                        ...bookStore,
                        ...pendingUpdate,
                    };
                }

                return bookStore;
            }) ?? []
        );
    }, [pendingUpdates, apiData]);

    function addPendingUpdate(storeId: string, pendingUpdate: PendingUpdate) {
        setPendingUpdates({
            ...pendingUpdates,
            [storeId]: pendingUpdate,
        });
    }

    function removePendingUpdate(storeId: string) {
        setPendingUpdates(omit(pendingUpdates, storeId));
    }

    async function updateRating(bookStoreId: string, newRating: number) {
        addPendingUpdate(bookStoreId, { rating: newRating });
        try {
            await apiClient.updateBookStoreRating(bookStoreId, newRating);

            // TODO: This will toggle multiple reloads and has a lot of potential for weird side effects.
            await reload();
        } finally {
            removePendingUpdate(bookStoreId);
        }
    }

    if (loading) {
        return <div>loading…</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }
    return (
        <BookStoreList
            bookStores={bookStores}
            onRatingSelected={(bookStore, newRating) =>
                void updateRating(bookStore.id, newRating)
            }
        />
    );
}
