import styled, { StyleSheetManager } from "styled-components";
import BookStores from "~/pages/BookStores";

const AppWrapper = styled.div``;

function App() {
    return (
        <StyleSheetManager disableVendorPrefixes>
            <AppWrapper className="book-stores-app">
                <BookStores />
            </AppWrapper>
        </StyleSheetManager>
    );
}

export default App;
