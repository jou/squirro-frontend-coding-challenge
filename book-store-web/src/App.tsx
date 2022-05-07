import "~/App.css";
import { useApiClient, useBookStores } from "~/hooks/useApiClient";

function App() {
    const apiClient = useApiClient();
    const { loading, error, data } = useBookStores(apiClient);
    console.log({ loading, error, data });

    return <div className="App">O HAI!</div>;
}

export default App;
