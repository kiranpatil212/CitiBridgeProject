import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStock } from '../models/user-stock';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  backendUrl = environment.backendUrl;
  userName: string;

  constructor(private http: HttpClient) { }

  getUserRecommendationsByParamaters(sector: String, parameter: String): Observable<any> {
    return this.http.get<UserStock>(this.backendUrl + "/stockDetails/showRecommendedStocks/" + sector + "/" + parameter)
  }

  saveStockSelectedByUser(companySymbol: String, quantity: String): Observable<any> {
    return this.http.post(this.backendUrl + "/userHistory/saveStocks/" + sessionStorage.getItem("loggedInUser") + "/" + companySymbol + "/" + quantity, Object)
  }
}
