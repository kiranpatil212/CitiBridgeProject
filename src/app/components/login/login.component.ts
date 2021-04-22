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

  constructor(private _service : RegistrationService, private _router : Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    let temp:User = { userId: this.user.userId, password: btoa(this.user.password.split('').reverse().join('')) };
  
    this._service.checkLogin(temp).subscribe((result : boolean) => {
        this._service.isValidUser = result;
        if(!result)
        {
          console.log(temp.userId);
          console.log("exception occurred")
          this.message="Bad credentials. Please enter valid Username and Password.";
          this._service.setLoggedIn(false)
        }
        else{
          console.log(temp.userId);
          console.log("response received");
          this._service.setLoggedIn(true);
          sessionStorage.setItem("isLoggedIn","true");
          this._router.navigateByUrl("");
         
        }
      },
      err => {
        this.message="Unable to fetch data, Server is down.";
    }
    );
  }
}
