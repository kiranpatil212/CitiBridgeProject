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
  ListOfXaxisStockSymbols: String[];
  // ListOfYaxisLabels: Number[];

  ListOfCloseValues: Number[];
  ListOfOpenValues: Number[];
  ListOfHighValues: Number[];
  ListOfLowValues: Number[];

  msgs: Message[] = [];

  position: string;
  displayPosition: boolean;
  value1: string;
  public Flag: boolean = false;


  basicData: any;
  basicOptions: any;

  // subscription: Subscription;
  // config: AppConfig;
  // config: RegistrationService;

  products: Product[];

  cols: any[];

  // constructor(private messageService: MessageService, private configService: AppConfigService) {}

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

  showPositionDialog() {
    this.position = "right";
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

  getCompanyDetails(companyData) {

    this.showPositionDialog()
    console.log(companyData)

    if (this.Flag == true && this.value1 != null) {

      let companySymbol = companyData.stockSymbol
      console.log(companySymbol)
      console.log(this.value1)

      this.apiService.saveStockSelectedByUser(companySymbol, this.value1).subscribe(
        data => {
          console.log(data)
        }
      )
    }
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

        this.ListOfXaxisStockSymbols = data.map(data => data.stockSymbol)
        this.ListOfOpenValues = data.map(data => data.open)
        this.ListOfCloseValues = data.map(data => data.close)
        this.ListOfHighValues = data.map(data => data.high)
        this.ListOfLowValues = data.map(data => data.low)

        // console.log(this.ListOfXaxisStockSymbols)
        // console.log(this.ListOfOpenValues)
        // console.log(this.ListOfCloseValues)
        // console.log(this.ListOfHighValues)
        // console.log(this.ListOfLowValues)

        if (this.selectedParameter.codeP == "CHANGE") {
          this.cols = [
            { field: 'stockSymbol', header: 'Stock' },
            { field: 'companyName', header: 'Company' },
            { field: 'open', header: 'Open' },
            { field: 'close', header: 'Close' },
            { field: 'high', header: 'High' },
            { field: 'low', header: 'Low' },
            { field: 'change', header: 'Change' }
          ];
          // this.ListOfYaxisLabels = data.map(data => data.change)
        }


        if (this.selectedParameter.codeP == "PERATIO") {
          this.cols = [
            { field: 'stockSymbol', header: 'Stock' },
            { field: 'companyName', header: 'Company' },
            { field: 'open', header: 'Open' },
            { field: 'close', header: 'Close' },
            { field: 'high', header: 'High' },
            { field: 'low', header: 'Low' },
            { field: 'peRatio', header: 'PE Ratio' }
          ];
          // this.ListOfYaxisLabels = data.map(data => data.peRatio)
        }


        if (this.selectedParameter.codeP == "MARKET_CAP") {
          this.cols = [
            { field: 'stockSymbol', header: 'Stock' },
            { field: 'companyName', header: 'Company' },
            { field: 'open', header: 'Open' },
            { field: 'close', header: 'Close' },
            { field: 'high', header: 'High' },
            { field: 'low', header: 'Low' },
            { field: 'marketCap', header: 'Market Capital' }
          ];
          // this.ListOfYaxisLabels = data.map(data => data.marketCap)
        }

        this.renderComparisonChart()
      }
    )
  }

  renderComparisonChart() {

    // this.canvas = document.getElementById("CountryChart");
    // this.ctx = this.canvas.getContext("2d");
    // var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    // gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    // gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    // gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

    this.basicData = {
      labels: this.ListOfXaxisStockSymbols,
      datasets: [
        // {
        //   type: 'line',
        //   label: 'Parameter Selected',
        //   borderColor: '#FFA726',
        //   borderWidth: 2,
        //   fill: false,
        //   data: this.ListOfYaxisLabels
        // },
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
