import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { NgForm } from '@angular/forms';
import { UserHistory } from 'src/app/models/user-history';
import { UserStock } from 'src/app/models/user-stock';
import { StockHistory } from 'src/app/models/stock-history';
import { Message } from 'primeng/api';
import { UserHistoryService } from 'src/app/services/user-history.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {

  cols: any[];
  listOfUserHistory: UserHistory[];
  selectedStock: UserStock;
  selectedStockSymbol: string;
  stockSelectedFlag = false;

  selectedStocks: UserHistory[];
  stock: UserHistory;

  listOfselectedStockHistory: StockHistory[];
  listOfAdjCloseValues: Number[];
  listOfDates: string[];

  chartData: any;
  chartConfigOptions: any;

  msgs: Message[] = [];

  constructor(private userHistoryService: UserHistoryService) { }

  ngOnInit() {

    if (this.stockSelectedFlag == false) {
      this.userHistoryService.getUserHistoryByUsername().subscribe(
        (data: UserHistory[]) => {
          if (data != null && data.length > 0) {
            this.listOfUserHistory = data
            this.getSelectedStockDetails(this.listOfUserHistory[0])
          }
          else {
            this.msgs = [{ severity: 'error', summary: 'ServerError', detail: 'Trouble getting History of Selected Stock, try again' }];
          }
        }, err => {
          this.msgs = [{ severity: 'error', summary: 'NetworkError', detail: 'Server down. Trouble getting History of Selected Stock, try again' }];
        }
      )
    }

    this.cols = [
      { field: 'companySymbol', header: 'Stock' },
      { field: 'sector', header: 'Sector' },
      { field: 'volume', header: 'Volume' },
      { field: 'price', header: 'Saved Price (INR)' }
    ];
  }

  getSelectedStockDetails(companyData) {
    let companySymbol = companyData.companySymbol
    this.selectedStockSymbol = companySymbol

    this.userHistoryService.getCurrentStatisticsOfSelectedStock(companySymbol).subscribe(
      (data: UserStock) => {
        if (data != null) {
          this.selectedStock = data
          this.listOfselectedStockHistory = this.selectedStock.history
          this.listOfDates = this.listOfselectedStockHistory.map(data => new Date(data.date).toDateString().split(" ")[1])
          this.listOfAdjCloseValues = this.listOfselectedStockHistory.map(data => data.adjClose)
          this.renderSelectedStockChart()
          this.stockSelectedFlag = true
        }
        else {
          this.msgs = [{ severity: 'error', summary: 'ServerError', detail: 'Trouble fetching current Statistics of Selected Stock, try again' }];
        }
      }, err => {
        this.msgs = [{ severity: 'error', summary: 'NetworkError', detail: 'Server down. Trouble fetching current Statistics of Selected Stock, try again' }];
      }
    )
  }

  applyDarkTheme() {
    this.chartConfigOptions = {
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

  renderSelectedStockChart() {
    this.chartData = {
      labels: this.listOfDates,
      datasets: [
        {
          type: 'line',
          label: 'AdjClose',
          borderColor: '#42A5F5',
          borderWidth: 2,
          fill: false,
          data: this.listOfAdjCloseValues
        }
      ]
    }
    this.applyDarkTheme()
  }

}
