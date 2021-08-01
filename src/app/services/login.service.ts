import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInStatus = false
  isValidUser: boolean = false;

  backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  checkLogin(user: User): Observable<any> {
    return this.http.post(this.backendUrl + "/user/login", user)
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
}
