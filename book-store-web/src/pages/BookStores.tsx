import { useApiClient, useBookStores } from "~/hooks/useApiClient";
import BookStoreList from "~/components/BookStoreList";

export default function BookStores(): JSX.Element {
    const apiClient = useApiClient();
    const { loading, error, data: bookStores } = useBookStores(apiClient);

    if (loading) {
        return <div>loading...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }
    return <BookStoreList bookStores={bookStores?.data ?? []} />;
}
