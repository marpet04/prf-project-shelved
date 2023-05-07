import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = new FormControl('');
  password = new FormControl('');
  
  constructor(private router : Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.login(this.username.value!, this.password.value!);
  }

}
