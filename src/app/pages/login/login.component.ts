import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {IUser} from "../../models/user/user";
import {CookieService} from "ngx-cookie-service";
import {LoginService} from "../../services/login/login.service";
import {ILogin} from "../../models/login/login";
import {UserService} from "../../services/user/user.service";
import {IAlert} from "../../models/alert/alert";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    error = ''
    errorSubmit = ''
    remove = false
    removeCheck = false
    alerts: IAlert[] = []
    user: IUser

    form = new FormGroup({
        login: new FormControl(),
        password: new FormControl(),
        savePassword: new FormControl()
    })

    constructor(
        private router: Router,
        private cookieService: CookieService,
        private loginService: LoginService,
        private userService: UserService,
    ) {
    }

    get login() {
        return this.form.get('login') as FormControl
    }

    get password() {
        return this.form.get('password') as FormControl
    }

    ngOnInit(): void {
        const token = this.cookieService.get('token')
        if (token) {
            this.router.navigate(['/dashboard'])
        } else {
            const refreshToken = this.cookieService.get('refreshToken')
            if (refreshToken) {
                this.router.navigate(['/dashboard'])
            }
        }
        console.log(this.login)
    }

    togglePassword() {
        this.remove = !this.remove
    }

    toggleCheck() {
        this.removeCheck = !this.removeCheck
    }

    open(type: string, text: string) {
        if (this.alerts.length >= 3) {
            this.alerts.shift()
        }

        const newAlert = {
            type,
            text,
            visible: true
        }

        this.alerts.push(newAlert)

        setTimeout(() => {
            newAlert.visible = false
        }, 15000)
    }

    submit() {
        const login: ILogin = {
            login: this.form.value.login,
            password: this.form.value.password
        }

        this.loginService.postLogin(login)
            .subscribe(
                (response: IUser) => {
                    this.user = response
                    this.userService.setCurrentUser(this.user)

                    if (this.form.value.savePassword) {
                        const expiredDate = new Date()
                        expiredDate.setDate(expiredDate.getDate() + 30)
                        this.cookieService.set('token', this.user.tokens.token, expiredDate)
                        this.cookieService.set('refreshToken', this.user.tokens.refreshToken, expiredDate)
                    } else {
                        this.cookieService.delete('token')
                        this.cookieService.delete('refreshToken')
                    }
                    setTimeout(() => {
                        this.router.navigate(['/dashboard'])
                    }, 1500)
                },
                (error) => {
                    this.form.reset()
                    this.errorSubmit = error.error.hasError
                    console.log(this.errorSubmit)
                    this.error = error.error.errors[0]
                    this.open('fail', this.error)
                }
            )
    }
}
