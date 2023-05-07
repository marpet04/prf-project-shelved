import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';


@Injectable({
    providedIn: 'root'
})
export class BookService {

    headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private httpClient: HttpClient) { }

    getAllBooks() {
        return this.httpClient.get<[Book]>(environment.baseUrl + 'books', {withCredentials: true});
    }

    getbookBybookname(book: Book) {
        this.httpClient.get<Book>(environment.baseUrl + 'books/' + book.bookId, { headers: this.headers }).subscribe(result => { console.log(result); });
    }

    addNewbook(book: Book) {
        return this.httpClient.post(environment.baseUrl + 'books', JSON.stringify(book), { headers: this.headers });
    }

    updatebook(book: Book) {
        return this.httpClient.put(environment.baseUrl + 'books/' + book.bookId, JSON.stringify(book), { headers: this.headers });
    }

    deletebook(book: Book) {
        return this.httpClient.delete(environment.baseUrl + 'books/' + book.bookId);
    }
}