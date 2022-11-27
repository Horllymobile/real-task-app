import { Component, OnInit, ViewChild } from '@angular/core';

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

  constructor() {
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

    this.pieData = {
      labels: ['Pending', 'Progress', 'Done'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FFA726', '#42A5F5', '#66BB6A'],
          hoverBackgroundColor: ['#FFB74D', '#64B5F6', '#81C784'],
        },
      ],
    };
  }

  ngOnInit() {}
}
