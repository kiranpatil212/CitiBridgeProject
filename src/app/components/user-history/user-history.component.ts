import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { RegistrationService } from 'src/app/registration.service';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { UserHistory } from 'src/app/models/user-history';
import { UserStock } from 'src/app/models/user-stock';
import { StockHistory } from 'src/app/models/stock-history';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {

  public canvas: any;
  public ctx;

  cols: any[];
  ListOfUserHistory: UserHistory[];
  selectedStock: UserStock;
  selectedStockSymbol: string;
  StockSelectedFlag = false;

  selectedStocks: UserHistory[];
  stock : UserHistory ;

  ListOfselectedStockHistory: StockHistory[] ;
  ListOfAdjCloseValues: Number[] ;
  ListOfDates: any ;

  basicData: any;
  basicOptions: any;

  // userHistory: UserHistory[];

  constructor(private service: RegistrationService, private apiService: ApiService) { }

  ngOnInit() {
    // this.userHistory.push({ });

    if(this.StockSelectedFlag == false) {
      this.apiService.getUserHistoryByUsername().subscribe(
        (data: UserHistory[]) => {
          // console.log(data)
          this.ListOfUserHistory = data
          console.log(this.ListOfUserHistory)
          this.getSelectedStockDetails(this.ListOfUserHistory[0])
        }
      )
    }
    

    this.cols = [
      { field: 'companySymbol', header: 'Stock' },
      { field: 'sector', header: 'Sector' },
      { field: 'volume', header: 'Volume' },
      { field: 'price', header: 'Saved Price' }
    ];
  }

  getSelectedStockDetails(companyData) {
    console.log(companyData)
    let companySymbol = companyData.companySymbol
    this.selectedStockSymbol = companySymbol
    console.log(companySymbol)

    this.apiService.getSelectedStockCurrentStatistics(companySymbol).subscribe(
      (data: UserStock) => {
        // console.log(data)

        this.StockSelectedFlag = true
        this.selectedStock = data
        console.log(this.selectedStock)

        this.ListOfselectedStockHistory = this.selectedStock.history
        // console.log(this.ListOfselectedStockHistory)

        this.ListOfDates = this.ListOfselectedStockHistory.map(data => data.date)
        this.ListOfAdjCloseValues = this.ListOfselectedStockHistory.map(data => data.adjClose)

        // console.log(this.ListOfDates)
        // console.log(this.ListOfAdjCloseValues)

        // this.renderSelectedStockTable()

        this.renderComparisonChart()
      }
    )
  }

  

  applyDarkTheme() {
    this.basicOptions = {
      legend: {
        labels: {
          fontColor: '#ebedef'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#ebedef'
          },
          gridLines: {
            color: 'rgba(255,255,255,0.2)'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: '#ebedef'
          },
          gridLines: {
            color: 'rgba(255,255,255,0.2)'
          }
        }]
      }
    };

  }

  renderComparisonChart() {

    this.basicData = {
      labels: this.ListOfDates,
      datasets: [
        {
          type: 'line',
          label: 'AdjClose',
          borderColor: '#42A5F5',
          // backgroundColor : '#42A5F5',
          borderWidth: 2,
          fill: false,
          data: this.ListOfAdjCloseValues
        }
      ]
    }

    this.applyDarkTheme()

  }

}
