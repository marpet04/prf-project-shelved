import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private service: UserService) {
        
}

canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
        return this.service.getUserByUsername(localStorage.getItem('user') as string).pipe(
            map((result: User) => {
                if (result.accessLevel === 3) {
                    return true;
                } else {
                    return false;
                }
            })
        );
}
  
}