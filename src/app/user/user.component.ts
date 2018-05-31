import {Component, OnInit} from '@angular/core';
import {User} from './user.component.model';
import {UserService} from '../user/user.component.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root'
  //templateUrl: './user.component.html',
  //styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  //displayedColumns = ['id', 'username', 'salary', 'age'];
  //dataSource = new MatTableDataSource();
  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        //this.dataSource.data = data;
      }
    );
  }
}