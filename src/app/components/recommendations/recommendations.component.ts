import { Component, NgModule, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/registration.service';
import { Product } from 'src/app/product';
import { ApiService } from 'src/app/api.service';
import { UserStock } from 'src/app/models/user-stock';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import Chart from 'chart.js';


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

  public canvas: any;
  public ctx;

  sector: Sector[];
  selectedSector: Sector;

  parameter: Parameter[];
  selectedParameter: Parameter;

  renderData = false;
  showChart = false;

  ListOfRecommendationsForUser: UserStock[];
  ListOfXaxisCompanySymbols: String[];

  ListOfCloseValues: Number[];
  ListOfOpenValues: Number[];
  ListOfHighValues: Number[];
  ListOfLowValues: Number[];

  msgs: Message[] = [];

  position: string;
  displayPosition: boolean;
  volume: string;
  public Flag: boolean = false;

  selectedStock: any;

  basicData: any;
  basicOptions: any;

  products: Product[];

  cols: any[];
  frozenCols: any[];


  constructor(private service: RegistrationService, private apiService: ApiService, private confirmationService: ConfirmationService) {

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
      { nameP: 'PE Ratio', codeP: 'PERATIO' },
      { nameP: 'Market Capital', codeP: 'MARKET_CAP' }
    ];

    this.frozenCols = [
      { field: 'change', header: 'Change' },
      { field: 'peRatio', header: 'PE Ratio' },
      { field: 'marketCap', header: 'Market Capital' }
    ];
  }

  ngOnInit() {

    // this.service.getProductsSmall().then(data => this.products = data);

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
        this.Flag = true
        console.log(this.Flag)
        this.getCompanyDetails()
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Stock Saved' }];
      },
      reject: () => {
        this.Flag = false
        console.log(this.Flag)
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'Stock not Saved' }];
      },
      key: "positionDialog"
    });
  }

  getCompanyDetails() {



    let companySymbol = this.selectedStock.companySymbol
    console.log(this.selectedStock)
    console.log(this.volume)

    this.apiService.saveStockSelectedByUser(companySymbol, this.volume).subscribe(
        data => {
          console.log(data)
        }, err => {
          this.msgs = [{ severity: 'danger', summary: 'ServerError', detail: 'Server down. Stock could not saved, try again' }];
        }
      )
  }


  getRecommendations() {
    this.renderData = true
    this.showChart = true
    console.log(this.selectedSector.codeS)
    console.log(this.selectedParameter.codeP)
    this.apiService.getUserRecommendationsByParamaters(this.selectedSector.codeS, this.selectedParameter.codeP).subscribe(
      (data: UserStock[]) => {
        console.log(data)
        this.ListOfRecommendationsForUser = data
        // console.log(this.ListOfRecommendationsForUser)

        this.ListOfXaxisCompanySymbols = data.map(data => data.companySymbol)
        this.ListOfOpenValues = data.map(data => data.open)
        this.ListOfCloseValues = data.map(data => data.close)
        this.ListOfHighValues = data.map(data => data.high)
        this.ListOfLowValues = data.map(data => data.low)

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

        if (this.selectedParameter.codeP == "PERATIO") {
          
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
        
      }, err => {
        this.msgs = [{ severity: 'danger', summary: 'ServerError', detail: 'Server Error. Trouble getting User recommendations, try again' }];
      }
    )
  }

  renderComparisonChart() {

    this.basicData = {
      labels: this.ListOfXaxisCompanySymbols,
      datasets: [
        {
          type: 'line',
          label: 'Open',
          borderColor: '#FFFF6C',
          borderWidth: 2,
          fill: false,
          data: this.ListOfOpenValues
        },
        {
          type: 'bar',
          label: 'Close',
          // backgroundColor: '#7E57C2',
          backgroundColor: '#98FE8D',
          borderWidth: 2,
          fill: false,
          data: this.ListOfCloseValues
        },
        {
          type: 'bar',
          label: 'High',
          // backgroundColor: '#66BB6A',
          backgroundColor: '#eb3349',
          borderWidth: 2,
          fill: true,
          data: this.ListOfHighValues
        },
        {
          type: 'bar',
          label: 'Low',
          // backgroundColor: '#42A5F5',
          backgroundColor: '#9e768f',
          borderWidth: 2,
          fill: true,
          data: this.ListOfLowValues
        },
      ]
    }
    this.applyDarkTheme()
  }
}
