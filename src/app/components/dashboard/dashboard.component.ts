import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { NewsArticle } from "src/app/models/news-article";
import { UserStock } from "src/app/models/user-stock";
import { Message } from 'primeng/api';
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})


export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;

  public listOfSectors: String[] = [];
  public listOfAvgGrowth: Number[] = [];
  public topPerformingStock: UserStock;
  public stockFlag: boolean = false;

  public latestNews: any;
  public newsArticles: NewsArticle[];
  msgs: Message[] = [];

  responsiveOptions;

  constructor(private dashboardService: DashboardService) {

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

  }

  ngOnInit() {

    this.dashboardService.getLatestNews().subscribe(
      data => {
        this.latestNews = data.articles
      }, err => {
        this.msgs = [{ severity: 'danger', summary: 'ServerError', detail: 'Server Error. Trouble getting latest news, try again' }];
      }
    )

    this.dashboardService.getSectorWiseComparison().subscribe(
      data => {
        this.listOfSectors = data.map(data => data.sector)
        this.listOfAvgGrowth = data.map(data => data.avggrowth)
        this.renderSectorsTable()

      }, err => {
        this.msgs = [{ severity: 'danger', summary: 'ServerError', detail: 'Server Error. Trouble getting Sector Wise Comparison, try again' }];
      }
    );

    this.dashboardService.getTopPerformingStockDetails().subscribe(
      data => {
        this.stockFlag = true
        this.topPerformingStock = data

      }, err => {
        this.msgs = [{ severity: 'danger', summary: 'ServerError', detail: 'Server Error. Trouble getting Top Performing Stock, try again' }];
      }
    );

  }

  renderSectorsTable() {

    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    this.canvas = document.getElementById("SectorChart");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors



    var myChart = new Chart(this.ctx, {
      type: 'bar',
      responsive: true,
      legend: {
        display: false
      },
      data: {
        labels: this.listOfSectors,
        datasets: [{
          label: "Sectors",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: this.listOfAvgGrowth,
        }]
      },
      options: gradientBarChartConfiguration
    });
  }

}


