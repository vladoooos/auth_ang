import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ILogin} from "../../models/login/login";
import {IUser} from "../../models/user/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private api = 'http://51.158.107.27:82/api/login'

    constructor(private http: HttpClient) {
    }

    postLogin(login: ILogin): Observable<IUser> {
        const body = {login: login.login, password: login.password}
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        return this.http.post<IUser>(this.api, body, {headers})
    }
}
