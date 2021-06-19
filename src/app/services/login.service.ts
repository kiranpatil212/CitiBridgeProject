import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInStatus = false
  isValidUser: boolean = false;

  serviceUrl = "http://localhost:8088";

  constructor(private http: HttpClient) { }

  checkLogin(user: User): Observable<any> {
    return this.http.post(this.serviceUrl + "/user/login", user)
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
}
