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
    return this.http.get(this.backendUrl + "/sectorStocks/getNews")
  }

  getSectorWiseComparison(): Observable<any> {
    return this.http.get(this.backendUrl + "/sectorStocks/showSectorWiseChange")
  }

  getTopPerformingStockDetails(): Observable<any> {
    return this.http.get(this.backendUrl + "/userHistory/showTopPerformingStock/" + sessionStorage.getItem("loggedInUser"))
  }
}
