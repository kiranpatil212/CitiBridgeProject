import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {MessageService, SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {ChartModule} from 'primeng/chart';
import { RegistrationService } from 'src/app/registration.service';


interface Sector {
  nameS: string,
  codeS: string
}

interface Choice {
  nameC: string,
  codeC: string
}

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})


export class RecommendationsComponent implements OnInit {

  sector: Sector[];
  selectedSector: Sector;

  choice2: Choice[];
  selectedChoice2: Choice;


  basicData: any;
  basicOptions: any;
  // subscription: Subscription;
  // config: AppConfig;
  config: RegistrationService;

  // constructor(private messageService: MessageService, private configService: AppConfigService) {}

  constructor( private configService: RegistrationService ) {
    
    this.sector = [
      {nameS: 'IT', codeS: 'IT'},
      {nameS: 'Pharma', codeS: 'PH'},
      {nameS: 'Housing Finance', codeS: 'HF'},
      {nameS: 'Auto', codeS: 'AU'},
      {nameS: 'Infrastructure', codeS: 'INF'},
      {nameS: 'Urban Consumption', codeS: 'FMCG'},
      {nameS: 'Logistics', codeS: 'LO'}
    ];

    this.choice2 = [
      {nameC: 'Long Term', codeC: 'LT'},
      {nameC: 'Short Term', codeC: 'ST'}
    ];

   }

  ngOnInit() {

    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#42A5F5'
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: '#FFA726'
          }
      ]
    }

    // this.config = this.configService.config;
    //     this.updateChartOptions();
    //     this.subscription = this.configService.configUpdate$.subscribe(config => {
    //       this.config = config;
    //       this.updateChartOptions();
    //     });

    this.applyDarkTheme();

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

}
