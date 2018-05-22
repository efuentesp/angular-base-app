
import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.component.model';
import { UserService } from '../user/user.component.service';

@Component({
    selector: 'router-outlet-home',
    moduleId: module.id,
    templateUrl: 'tiles.component.html'
})


export class TilesComponent implements OnInit {
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