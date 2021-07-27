import { Component, NgModule, OnInit } from '@angular/core';
import { UserStock } from 'src/app/models/user-stock';
import { ConfirmationService } from 'primeng/api';
import { RecommendationsService } from 'src/app/services/recommendations.service';
import { UserHistory } from 'src/app/models/user-history';
import { MessageService } from 'primeng/api';

interface Sector {
  nameS: string,
  codeS: string
}

interface Parameter {
  nameP: string,
  codeP: string
}

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
  providers: [ConfirmationService, MessageService]
})


export class RecommendationsComponent implements OnInit {

  sector: Sector[];
  selectedSector: Sector;

  parameter: Parameter[];
  selectedParameter: Parameter;

  renderData = false;
  showChart = false;

  listOfRecommendationsForUser: UserStock[];
  listOfXaxisCompanySymbols: String[];

  listOfCloseValues: Number[];
  listOfOpenValues: Number[];
  listOfHighValues: Number[];
  listOfLowValues: Number[];

  position: string;
  displayPosition: boolean;
  volume: string;
  public flag: boolean = false;
  selectedStock: UserStock;

  chartData: any;
  chartConfigOptions: any;
  cols: any[];

  constructor(private recommendationsService: RecommendationsService,
    private confirmationService: ConfirmationService, private messageService: MessageService) {

    this.sector = [
      { nameS: 'Automobile', codeS: 'AUTOMOBILE' },
      { nameS: 'Chemicals', codeS: 'CHEMICALS' },
      { nameS: 'Commodities', codeS: 'COMMODITIES' },
      { nameS: 'Consumer Goods', codeS: 'CONSUMER GOODS' },
      { nameS: 'Energy', codeS: 'ENERGY' },
      { nameS: 'Financial Services', codeS: 'FINANCIAL SERVICES' },
      { nameS: 'Infrastructure', codeS: 'INFRASTRUCTURE' },
      { nameS: 'IT', codeS: 'IT' },
      { nameS: 'Metal', codeS: 'METAL' },
      { nameS: 'Pharma', codeS: 'PHARMA' },
      { nameS: 'Telecom', codeS: 'TELECOM' }

    ];

    this.parameter = [
      { nameP: 'Change', codeP: 'CHANGE' },
      { nameP: 'PE Ratio', codeP: 'PE_RATIO' },
      { nameP: 'Market Capital', codeP: 'MARKET_CAP' }
    ];

  }

  ngOnInit() { }

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

  showPositionDialog(companyData) {
    this.position = "right";
    this.selectedStock = companyData;
    this.displayPosition = true;
  }

  confirmSaveStock(pos) {
    this.displayPosition = false
    this.position = pos

    this.confirmationService.confirm({
      message: 'Do you want to save this stock?',
      header: 'Save Stock Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.flag = true
        this.saveStockSelectedByUser()
      },
      reject: () => {
        this.flag = false
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Stock not Saved' });
      },
      key: "positionDialog"
    });
  }

  saveStockSelectedByUser() {

    let stockToSave: UserHistory = new UserHistory();
    stockToSave.companySymbol = this.selectedStock.companySymbol;
    stockToSave.userId = sessionStorage.getItem("loggedInUser");
    stockToSave.sector = this.selectedSector.codeS;
    stockToSave.volume = Number(this.volume);
    stockToSave.price = this.selectedStock.close;


    this.recommendationsService.saveStockSelectedByUser(stockToSave).subscribe(
      data => {
        if (data != null) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Stock saved successfully' });
        }
        else {
          this.messageService.add({ severity: 'warn', summary: 'NetworkError', detail: 'Stock could not be saved, try again' });
        }
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'ServerError', detail: 'Server down. Stock could not be saved, try again' });
      }
    )
  }

  getRecommendations() {
    this.recommendationsService.getUserRecommendationsByParamaters(this.selectedSector.codeS, this.selectedParameter.codeP).subscribe(
      (data: UserStock[]) => {
        if (data != null && data.length > 0) {
          this.cols = [
            { field: 'companySymbol', header: 'Stock' },
            { field: 'companyName', header: 'Company' },
            { field: 'open', header: 'Open' },
            { field: 'close', header: 'Close' },
            { field: 'high', header: 'High' },
            { field: 'low', header: 'Low' }
          ];
          
          this.listOfRecommendationsForUser = data
          this.listOfXaxisCompanySymbols = data.map(data => data.companySymbol)
          this.listOfOpenValues = data.map(data => data.open)
          this.listOfCloseValues = data.map(data => data.close)
          this.listOfHighValues = data.map(data => data.high)
          this.listOfLowValues = data.map(data => data.low)

          if (this.selectedParameter.codeP == "CHANGE") {
            this.cols.push({ field: 'change', header: 'Change' });
          }
          if (this.selectedParameter.codeP == "PE_RATIO") {
            this.cols.push({ field: 'peRatio', header: 'PE Ratio' });
          }
          if (this.selectedParameter.codeP == "MARKET_CAP") {
            this.cols.push({ field: 'marketCap', header: 'Market Capital' });
          }

          this.renderComparisonChart()
          this.renderData = true
          this.showChart = true
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'NetworkError', detail: 'Trouble getting User recommendations, try again' });
        }
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'ServerError', detail: 'Server down. Trouble getting User recommendations, try again' });
      }
    )
  }

  renderComparisonChart() {

    this.chartData = {
      labels: this.listOfXaxisCompanySymbols,
      datasets: [
        {
          type: 'line',
          label: 'Open',
          borderColor: '#FFFF6C',
          borderWidth: 2,
          fill: false,
          data: this.listOfOpenValues
        },
        {
          type: 'bar',
          label: 'Close',
          backgroundColor: '#98FE8D',
          borderWidth: 2,
          fill: false,
          data: this.listOfCloseValues
        },
        {
          type: 'bar',
          label: 'High',
          backgroundColor: '#eb3349',
          borderWidth: 2,
          fill: true,
          data: this.listOfHighValues
        },
        {
          type: 'bar',
          label: 'Low',
          backgroundColor: '#9e768f',
          borderWidth: 2,
          fill: true,
          data: this.listOfLowValues
        },
      ]
    }
    this.applyDarkTheme()
  }
}