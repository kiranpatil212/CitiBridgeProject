import { Component, OnInit } from '@angular/core';
import { UserHistory } from 'src/app/models/user-history';
import { UserStock } from 'src/app/models/user-stock';
import { StockHistory } from 'src/app/models/stock-history';
import { UserHistoryService } from 'src/app/services/user-history.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
  providers: [MessageService]
})
export class UserHistoryComponent implements OnInit {

  cols: any[];
  listOfUserHistory: UserHistory[] = [];
  selectedStock: UserStock;
  selectedStockSymbol: string;
  stockSelectedFlag : boolean = false;
  noUserHistoryFlag : boolean = false;

  selectedStocks: UserHistory[];
  stock: UserHistory;

  listOfselectedStockHistory: StockHistory[];
  listOfAdjCloseValues: Number[];
  listOfDates: string[];
  ids: Number[];

  chartData: any;
  chartConfigOptions: any;

  constructor(private userHistoryService: UserHistoryService, private messageService: MessageService) { }

  ngOnInit() {
    this.listOfUserHistory = [];
    if (this.stockSelectedFlag == false) {
      this.userHistoryService.getUserHistoryByUsername().subscribe(
        (data: UserHistory[]) => {
          if (data != null && data.length > 0) {
            this.listOfUserHistory = data
            this.getSelectedStockDetails(this.listOfUserHistory[0])
          }
          else {
            this.noUserHistoryFlag = true
            this.messageService.add({ severity: 'error', summary: 'NetworkError', detail: 'Trouble getting History of Saved Stocks, try again' });
          }
        }, err => {
          this.messageService.add({ severity: 'error', summary: 'ServerError', detail: 'Trouble getting History of Saved Stocks, try again' });
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
    this.stockSelectedFlag = false
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
          this.messageService.add({ severity: 'error', summary: 'ServerError', detail: 'Trouble fetching current Statistics of Selected Stock, try again' });
        }
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'NetworkError', detail: 'Server down. Trouble fetching current Statistics of Selected Stock, try again' });
      }
    )
  }

  deleteSelectedStocks() {
    this.ids = this.selectedStocks.map(data => data.id)
    if (this.ids == null || this.ids.length == 0) {
      this.messageService.add({ severity: 'warn', summary: 'No Stocks Selected', detail: 'Please select stocks to delete.' });
      this.selectedStocks = null;
      return;
    }
    this.userHistoryService.deleteStocksFromUserHistory(this.ids).subscribe(
      (data: boolean) => {
        if (data == true) {
          this.messageService.add({ severity: 'success', summary: 'Selected Stocks Deleted', detail: 'Selected Stocks are successfully deleted.' });
          location.reload();
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'ServerError', detail: 'Trouble deleting selected Stocks, try again' });
          this.selectedStocks = null;
        }
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'ServerError', detail: 'Trouble deleting selected Stocks, try again' });
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
