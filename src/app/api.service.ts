import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserHistory } from './models/user-history';
import { UserStock } from './models/user-stock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  backendUrl = environment.backendUrl;
  userName: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem("loggedInUser");
    console.log(this.userName)
  }

  getNewsApi(): Observable<any> {
    return this.http.get("https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=fe85013235624481abbe65c9f37baf27")
  }

  getSectorWiseComparison(): Observable<any> {
    return this.http.get(this.backendUrl+"/sectorStocks/showSectorWiseChange")
  }

  getUserHistoryByUsername(): Observable<any> {
    return this.http.get<UserHistory>(this.backendUrl+"/userHistory/showStocks/" + sessionStorage.getItem("loggedInUser"))
  }

  getUserRecommendationsByParamaters(sector: String, parameter: String): Observable<any> {
    return this.http.get<UserStock>(this.backendUrl+"/stockDetails/showRecommendedStocks/" + sector + "/" + parameter)
  }

  saveStockSelectedByUser( companySymbol: String, quantity: String): Observable<any> {
    return this.http.post(this.backendUrl+"/userHistory/saveStocks/" + sessionStorage.getItem("loggedInUser") + "/" + companySymbol + "/" + quantity, Object)
  }

  getSelectedStockCurrentStatistics(companySymbol: String): Observable<any> {
    return this.http.get<UserStock>(this.backendUrl+"/stockDetails/showStockDetails/" + companySymbol)
  }

  getTopPerformingStockDetails(): Observable<any> {
    return this.http.get(this.backendUrl+"/userHistory/showTopPerformingStock/" + sessionStorage.getItem("loggedInUser"))
  }

  deleteStocksFromUserHistory(ids: Number[]): Observable<any> {
    return this.http.post(this.backendUrl+"/userHistory/deleteSavedStocksByUserId", ids)
  }
}
