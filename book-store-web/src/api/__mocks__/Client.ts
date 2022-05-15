import type {
    default as ApiClient,
    BookStoreAttributes,
    JsonApiResponse,
} from "../Client";
import { vi } from "vitest";
import { PublicOf } from "~/utils/Types";

function createMock(): PublicOf<ApiClient> {
    return {
        fetchBookStores: vi.fn<
            [],
            Promise<JsonApiResponse<BookStoreAttributes[]>>
        >(),
    };
}

const mock = vi.fn().mockImplementation(createMock);
(mock as any).getDefault = createMock;

export default mock;
