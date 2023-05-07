import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private httpClient: HttpClient, private router : Router) { }

    async login(username: string, password: string) {
        this.httpClient.post(environment.baseUrl + 'login', JSON.stringify({username: username, password: password}), { headers: this.headers }).subscribe(result => {
            console.log(result);
            if (result == "Bejelentkezes sikeres") {
                this.router.navigateByUrl('/main/books');
                localStorage.setItem('user', username);
            }
        });
    }

    async logout() {
        this.httpClient.post(environment.baseUrl + 'logout', { headers: this.headers }).subscribe(result => { console.log(result); });
    }

    async register(username: string, password: string, birthDate: string) {
        this.httpClient.post(environment.baseUrl + 'register', JSON.stringify({username: username, password: password, accessLevel: 1, birthDate: birthDate}), { headers: this.headers }).subscribe(result => { console.log(result); });
    }
}