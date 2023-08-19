import {Injectable} from '@angular/core';
import {IUser} from "../../models/user/user";
import {CookieService} from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private currentUser: IUser

    constructor(private cookieService: CookieService) {
    }

    setCurrentUser(user: IUser) {
        this.currentUser = user
        this.cookieService.set('user', JSON.stringify(user))
    }

    getCurrentUser() {
        if (!this.currentUser) {
            const tokenUser = this.cookieService.get('user')
            if (tokenUser) {
                this.currentUser = JSON.parse(tokenUser)
            }
        }
        return this.currentUser
    }
}
