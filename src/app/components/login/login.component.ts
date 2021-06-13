import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RegistrationService } from 'src/app/registration.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User;
  
  message='';

  constructor(private service : RegistrationService, private router : Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    let temp:User = { userId: this.user.userId, password: btoa(this.user.password.split('').reverse().join('')) };
    
    this.service.checkLogin(temp).subscribe(
      (data) => {
      console.log(data)
        // this._service.isValidUser = result;
        if(!data )
        {
          console.log(data)
          this.service.isValidUser = false;
          console.log(temp.userId);
          console.log("exception occurred")

          this.message="Bad credentials. Please enter valid Username and Password.";
          this.service.setLoggedIn(false)
        }
        else{
          console.log(data)
          this.service.isValidUser = true ;
          console.log(temp.userId);
          sessionStorage.setItem("loggedInUser", temp.userId);
          console.log("response received");
          this.service.setLoggedIn(true);

          sessionStorage.setItem("isLoggedIn","true");
          this.router.navigateByUrl("/admin/dashboard");
         
        }
      },
      err => {
       
        console.log("exception occurred")
        this.message="Unable to fetch data, Server is down.";
      }
    );
  }
}
