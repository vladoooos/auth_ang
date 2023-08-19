import {Component, EventEmitter, Input, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({transform: 'translateX(100%)', opacity: 0})),
            transition(':enter', [
                animate('300ms ease-out', style({transform: 'translateX(0)', opacity: 1}))
            ]),
            transition(':leave', [
                style({transform: 'translateX(0)', opacity: 1}),
                animate('300ms ease-out', style({transform: 'translateX(100%)', opacity: 0}))
            ])
        ])
    ]
})
export class AlertComponent {
    @Input() type: string
    @Input() text: string
    @Input() visible: boolean = false
    @Output() closeAlert = new EventEmitter<void>();


    close(): void {
        this.closeAlert.emit();
    }
}
