import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getLatestNews(): Observable<any> {
    return this.http.get("https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=fe85013235624481abbe65c9f37baf27")
  }

  getSectorWiseComparison(): Observable<any> {
    return this.http.get(this.backendUrl + "/sectorStocks/showSectorWiseChange")
  }

  getTopPerformingStockDetails(): Observable<any> {
    return this.http.get(this.backendUrl + "/userHistory/showTopPerformingStock/" + sessionStorage.getItem("loggedInUser"))
  }
}
