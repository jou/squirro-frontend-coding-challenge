import { useApiClient, useBookStores } from "~/hooks/useApiClient";
import BookStoreList from "~/pages/BookStoreList";
import styled from "styled-components";

const AppWrapper = styled.div`
    .book-store__list {
        background-color: red;
    }
`;

function App() {
    const apiClient = useApiClient();
    const { loading, error, data: bookStores } = useBookStores(apiClient);

    if (loading) {
        return <div>loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <AppWrapper className="book-store">
            <BookStoreList
                className="book-store__list"
                bookStores={bookStores?.data ?? []}
            />
        </AppWrapper>
    );
}

export default App;
