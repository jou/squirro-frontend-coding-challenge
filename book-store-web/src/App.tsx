import styled, { StyleSheetManager } from "styled-components";
import BookStores from "~/pages/BookStores";
import { screens } from "~/utils/Styling";

const AppWrapper = styled.div`
    @media ${screens.md} {
        max-width: 60rem;
        margin: auto;
    }
`;

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
