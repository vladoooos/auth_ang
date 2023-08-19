import {Component, OnInit} from '@angular/core';
import {IAlert} from "../../models/alert/alert";
import {UserService} from "../../services/user/user.service";
import {IUser} from "../../models/user/user";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    alerts: IAlert[] = [];
    term = ''
    user: IUser

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.user = this.userService.getCurrentUser()
    }

    open(type: string, text: string) {
        if (this.alerts.length >= 3) {
            this.alerts.shift();
        }

        const newAlert = {
            type,
            text,
            visible: true
        };

        this.alerts.push(newAlert);

        setTimeout(() => {
            newAlert.visible = false
        }, 15000)

        this.term = ''
    }
}
