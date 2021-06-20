import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserHistory } from '../models/user-history';
import { UserStock } from '../models/user-stock';

@Injectable({
  providedIn: 'root'
})
export class UserHistoryService {

  backendUrl = environment.backendUrl;
  userName: string;

  constructor(private http: HttpClient) { }

  getUserHistoryByUsername(): Observable<any> {
    return this.http.get<UserHistory>(this.backendUrl + "/userHistory/showStocks/" + sessionStorage.getItem("loggedInUser"))
  }

  getCurrentStatisticsOfSelectedStock(companySymbol: String): Observable<any> {
    return this.http.get<UserStock>(this.backendUrl + "/stockDetails/showStockDetails/" + companySymbol)
  }

  deleteStocksFromUserHistory(ids: Number[]): Observable<any> {
    return this.http.post(this.backendUrl + "/userHistory/deleteSavedStocksByUserId", ids)
  }

  saveStockSelectedByUser(stockToSave: UserHistory):  Observable<any> {
    return this.http.post(this.backendUrl + "/userHistory/saveStocks",stockToSave);
  }
}
