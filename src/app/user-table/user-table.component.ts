import { Component, OnInit } from '@angular/core';

import { User, UserServiceService } from '../service/user-service.service';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  dataSource: User[] = [];
  displayedColumns: string[] = ['username', 'email', 'phone'];
  ngOnInit(): void {
    this.getUsers();
  }
  constructor(private userService: UserServiceService) {

  }
  getUsers() {
    this.userService.getUsers().
      subscribe(users => {this.dataSource = users;
      console.log(this.dataSource);});
  }
}
