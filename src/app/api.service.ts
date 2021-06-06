import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserHistory } from './models/user-history';
import { UserStock } from './models/user-stock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http : HttpClient ) { }

  getNewsApi() : Observable<any> {
    return this.http.get("https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=fe85013235624481abbe65c9f37baf27")
  }

  getSectorWiseComparison() : Observable<any> {
    return this.http.get("http://localhost:8088/sectorStocks/showSectorWiseChange")
  }

  getUserHistoryByUsername() : Observable<any> {
    return this.http.get<UserHistory>("http://localhost:8088/userhistory/showStocks/Rhythm")
  }

  // getUserRecommendationsByParamaters( sector, parameter ) : Observable<any> {
  //   return this.http.get("http://localhost:8088/sort/showsSortedData"+"/"+sector+"/"+parameter)
  // }

  getUserRecommendationsByParamaters(sector : String, parameter : String) : Observable<any> {
    // return this.http.get<UserStock>("http://localhost:8088/sort/showsSortedData?sector=" + sector + "&parameter=" + parameter)
    // return this.http.get("http://localhost:8088/sort/showsSortedData/Energy/change")
    return this.http.get<UserStock>("http://localhost:8088/sort/showsSortedData/"+sector+"/"+parameter)
  }

  saveStockSelectedByUser(companySymbol : String, quantity : String) : Observable<any> {
    return this.http.post("http://localhost:8088/userhistory/saveStocks/Rhythm/"+companySymbol+"/"+quantity, Object)
  }

  getSelectedStockCurrentStatistics(companySymbol : String) : Observable<any> {
    return this.http.get<UserStock>("http://localhost:8088/sort/showsStockDetails/"+companySymbol)
  }

  getTopPerformingStockDetails() : Observable<any> {
    return this.http.get("http://localhost:8088/userhistory/showTopPerformingStock/Rhythm")
  }

  deleteStocksFromUserHistory(ids : Number[]) : Observable<any> {
    return this.http.post("http://localhost:8088/userhistory/deleteStocks",ids)
  }
}
