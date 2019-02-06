import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    // baseUrl: string = 'http://localhost:3000/api/users';
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        console.log("22222222222")
        console.log(id)
        return this.http.get<User>(`${environment.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    updateUser(user: User) {
        return this.http.put<User>(`${environment.apiUrl}users/update` ,user);
      }
    

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }
}