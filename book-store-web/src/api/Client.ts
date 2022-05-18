import Kitsu from "kitsu";

const BASE_URL: string = import.meta.env.BOOK_STORE_API_URL ?? "/api";
let defaultApiClient: ApiClient;

export interface JsonApiResponse<DataType> {
    data: DataType;
    headers?: Record<string, any>;
    meta?: Record<string, any>;
    jsonapi?: Record<string, any>;
}

export interface JsonApiRelation<DataType> {
    data: DataType;
}

export interface AuthorAttributes {
    id: string;
    fullName: string;
}

export interface BookAttributes {
    id: string;
    author?: JsonApiRelation<AuthorAttributes>;
    copiesSold: number;
    name: string;
}

export interface CountryAttributes {
    id: string;
    code: string;
}

export interface BookStoreAttributes {
    id: string;
    name: string;
    website: string;
    rating: number;
    storeImage: string;
    establishmentDate: string;

    books: JsonApiRelation<BookAttributes[]>;
    countries: JsonApiRelation<CountryAttributes>;
}

export default class ApiClient {
    constructor(private jsonApiClient: Kitsu) {}

    static getDefault() {
        return defaultApiClient;
    }

    fetchBookStores(): Promise<JsonApiResponse<BookStoreAttributes[]>> {
        return this.jsonApiClient.fetch("stores");
    }

    updateBookStoreRating(
        bookStoreId: string,
        newRating: number,
    ): Promise<JsonApiResponse<BookStoreAttributes>> {
        const update: Partial<BookStoreAttributes> = {
            id: bookStoreId,
            rating: newRating,
        };
        return this.jsonApiClient.patch("stores", update);
    }
}

defaultApiClient = new ApiClient(
    new Kitsu({
        baseURL: BASE_URL,
    }),
);
