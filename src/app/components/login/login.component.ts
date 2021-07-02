import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User;
  message = '';

  constructor(private service : LoginService, private router : Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    let temp:User = { userId: this.user.userId, password: btoa(this.user.password.split('').reverse().join('')) };
    
    this.service.checkLogin(temp).subscribe(
      (data) => {
        if(!data)
        {
          this.service.isValidUser = false;
          this.message="Bad credentials. Please enter valid Username and Password.";
          this.service.setLoggedIn(false)
        }
        else{
          this.service.isValidUser = true ;
          sessionStorage.setItem("loggedInUser", temp.userId);
          this.service.setLoggedIn(true);
          sessionStorage.setItem("isLoggedIn","true");
          this.router.navigateByUrl("/admin/dashboard");
        }
      },
      err => {
        this.message="Unable to fetch data, Server is down.";
      }
    );
  }
}
