import { BookStoreAttributes } from "~/api/Client";
import { AllBooks, SampleBook } from "~/tests/fixtures/Books";

export const BookStores: BookStoreAttributes[] = [
    {
        id: "1",
        establishmentDate: "2020-01-01T00:00:00Z",
        name: "Awesome Book Store",
        website: "http://example.com/bookstore",
        storeImage: "http://example.com/bookstore/store.jpg",
        rating: 3,

        books: {
            data: [SampleBook],
        },
        countries: {
            data: {
                id: "1",
                code: "CH",
            },
        },
    },
    {
        id: "2",
        establishmentDate: "1960-01-01T00:00:00Z",
        name: "Awesomer Book Store",
        website: "http://example.com/awesomer-bookstore",
        storeImage: "http://example.com/awesomer-bookstore/store.jpg",
        rating: 4,

        books: {
            data: AllBooks,
        },
        countries: {
            data: {
                id: "1",
                code: "CH",
            },
        },
    },
];

export const AwesomeBookStore = BookStores[0];
