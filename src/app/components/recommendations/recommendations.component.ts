import { Component, NgModule, OnInit } from '@angular/core';
import { UserStock } from 'src/app/models/user-stock';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import Chart from 'chart.js';
import { RecommendationsService } from 'src/app/services/recommendations.service';


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
  providers: [ConfirmationService]
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

  msgs: Message[] = [];

  position: string;
  displayPosition: boolean;
  volume: string;
  public flag: boolean = false;

  selectedStock: any;

  basicData: any;
  basicOptions: any;

  cols: any[];

  constructor(private recommendationsService: RecommendationsService, private confirmationService: ConfirmationService) {

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
        this.getDetailsOfRecommendedStocks()
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Stock Saved' }];
      },
      reject: () => {
        this.flag = false
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'Stock not Saved' }];
      },
      key: "positionDialog"
    });
  }

  getDetailsOfRecommendedStocks() {

    let companySymbol = this.selectedStock.companySymbol
    this.recommendationsService.saveStockSelectedByUser(companySymbol, this.volume).subscribe(
      data => {
        console.log(data)
      }, err => {
        this.msgs = [{ severity: 'danger', summary: 'ServerError', detail: 'Server down. Stock could not saved, try again' }];
      }
    )
  }

  getRecommendations() {
    this.recommendationsService.getUserRecommendationsByParamaters(this.selectedSector.codeS, this.selectedParameter.codeP).subscribe(
      (data: UserStock[]) => {
        this.listOfRecommendationsForUser = data
        this.listOfXaxisCompanySymbols = data.map(data => data.companySymbol)
        this.listOfOpenValues = data.map(data => data.open)
        this.listOfCloseValues = data.map(data => data.close)
        this.listOfHighValues = data.map(data => data.high)
        this.listOfLowValues = data.map(data => data.low)

        if (this.selectedParameter.codeP == "CHANGE") {

          this.cols = [
            { field: 'companySymbol', header: 'Stock' },
            { field: 'companyName', header: 'Company' },
            { field: 'open', header: 'Open' },
            { field: 'close', header: 'Close' },
            { field: 'high', header: 'High' },
            { field: 'low', header: 'Low' },
            { field: 'change', header: 'Change' }
          ];
        }

        if (this.selectedParameter.codeP == "PE_RATIO") {

          this.cols = [
            { field: 'companySymbol', header: 'Stock' },
            { field: 'companyName', header: 'Company' },
            { field: 'open', header: 'Open' },
            { field: 'close', header: 'Close' },
            { field: 'high', header: 'High' },
            { field: 'low', header: 'Low' },
            { field: 'peRatio', header: 'PE Ratio' }
          ];
        }

        if (this.selectedParameter.codeP == "MARKET_CAP") {

          this.cols = [
            { field: 'companySymbol', header: 'Stock' },
            { field: 'companyName', header: 'Company' },
            { field: 'open', header: 'Open' },
            { field: 'close', header: 'Close' },
            { field: 'high', header: 'High' },
            { field: 'low', header: 'Low' },
            { field: 'marketCap', header: 'Market Capital' }
          ];
        }

        this.renderComparisonChart()
        this.renderData = true
        this.showChart = true

      }, err => {
        this.msgs = [{ severity: 'danger', summary: 'ServerError', detail: 'Server Error. Trouble getting User recommendations, try again' }];
      }
    )
  }

  renderComparisonChart() {

    this.basicData = {
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