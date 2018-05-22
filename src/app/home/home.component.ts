import { Component, OnInit } from '@angular/core';

import { User } from '../user/user.component.model';
import { UserService } from '../user/user.component.service';

@Component({
    selector: 'app-root',
    moduleId: module.id,
    templateUrl: 'home.component.html'
})


export class HomeComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) {}

    ngOnInit() {

        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
      
    }

}