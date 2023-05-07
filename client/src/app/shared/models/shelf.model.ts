import { Book } from "./book.model";
import { User } from "./user.model";

export interface Shelf {
    owner: User;
    shelfName: string;
    books: [Book];
}