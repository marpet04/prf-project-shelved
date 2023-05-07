import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnChanges {
  editProfile = new FormGroup({
    birthDate: new FormControl(''),
    accessLevel: new FormControl('')
  });

  modifiedData?: any;

  userList: any = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  ngOnChanges(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(result => {
      this.userList = result;
    });
  }

  editProfileData(username: string) {
    this.userService.getUserByUsername(username).subscribe(result => {
      this.modifiedData = result;
      if (this.editProfile.value.accessLevel != this.modifiedData.accessLevel || this.editProfile.value.birthDate != this.modifiedData.birthDate) {
        const temp = {
          username: this.modifiedData.username,
          password: this.modifiedData.password,
          accessLevel: this.editProfile.value.accessLevel,
          birthDate: this.editProfile.value.birthDate
        };
        this.userService.updateUser(temp as User).subscribe(updatedUser => {
          const index = this.userList.findIndex((user: User) => user.username === updatedUser.username);
          if (index > -1) {
            this.userList[index] = updatedUser;
          }
        });
      }
    });
  }

  deleteProfile(username: string) {
    console.log(username);
    this.userService.deleteUser(username).subscribe(
      () => {
        this.getAllUsers();
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
