import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {
  basicData: any;

  basicOptions: any;

  pieData: any;

  pieChartOptions: any = {
    label: {
      position: 'bottom',
    },
    legend: {
      position: 'bottom',
    },
  };

  constructor(private analyticsService: AnalyticsService) {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My Second dataset',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    this.analyticsService.getAnalytics('analyticsByStatus');
    this.analyticsService
      .getAnalyticsByStatus('getAnalyticsByStatus')
      .subscribe((res) => {
        console.log(res);
        this.pieData = {
          labels: [res[0].label, res[1].label, res[2].label],
          datasets: [
            {
              data: [res[0].number, res[1].number, res[2].number],
              backgroundColor: ['#FFA726', '#42A5F5', '#66BB6A'],
              hoverBackgroundColor: ['#FFB74D', '#64B5F6', '#81C784'],
            },
          ],
        };
      });
  }

  ngOnInit() {}
}
