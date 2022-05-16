import { BookAttributes } from "~/api/Client";
import { getById } from "~/utils/Collections";

export const SampleBooks: BookAttributes[] = [
    {
        id: "1",
        name: "Awesome Book",
        copiesSold: 20,
        author: {
            data: {
                id: "1",
                fullName: "John Doe",
            },
        },
    },
    {
        id: "2",
        name: "Awesomer Book",
        copiesSold: 300,
        author: {
            data: {
                id: "2",
                fullName: "Johner Doe",
            },
        },
    },
];
export const SampleBook: BookAttributes = SampleBooks[0];

export const BookWithoutAuthor: BookAttributes = {
    id: "3",
    name: "Awesomest Book",
    copiesSold: 400,
};

export const AllBooks: BookAttributes[] = [...SampleBooks, BookWithoutAuthor];

export const BestsellerFixture: BookAttributes[] = [
    getById(AllBooks, "3", true),
    getById(AllBooks, "2", true),
];
