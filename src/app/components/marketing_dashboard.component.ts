import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as Chart from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

Chart.defaults.global.plugins.datalabels.display = false;

/* tslint:disable */

@Component({
  selector: "marketing_dashboard",
  templateUrl: "./marketing_dashboard.component.html",
})

export class MarketingDashboardComponent implements OnInit {
  public filtersForm: FormGroup;
  public dataset: any = {};
  public chart: any = {};
  public bubbleChart: any = {};
  public retailers: any = ["Zara", "Uniqlo", "HM"];
  public selectedRetailers: any = ["Zara", "Uniqlo", "HM"];
  public categories: any = ["All categories", "Dresses", "T-shirts"];
  public timeFrames: any = ["Last week", "Last month", "Last year"];
  public selectedCategory = "All categories";
  public dataPoints: any = {
    "All categories": {
      Zara: [30, 7, 3, 3, 11, 1, 19, 4, 22],
      Uniqlo: [49, 4, 3, 8, 9, 2, 4, 10, 11],
      HM: [37, 5, 2, 5, 10, 2, 12, 7, 20]
    },
    "Dresses": {
      Zara: [13.5, 35.7, 50.8],
      Uniqlo: [0, 81.9, 18.1],
      HM: [10.3, 21.8, 67.8]
    },
    "T-shirts": {
      Zara: [8.4, 64.2, 27.4],
      Uniqlo: [25.6, 52.8, 21.7],
      HM: [25.6, 59.3, 15.2]
    }
  };
  public labels: any = ["Accessories", "Blazers", "Shirts", "Bodysuits", "Dresses", "Jeans", "Jumpsuits", "Knitwear", "Nightwear", "Outerwear", "Polo Shirts", "Shoes", "Shorts", "Skirts", "Socks and Tights", "Sweatshirts", "Swimwear", "T-Shirts", "Trousers", "Underwear", "Others"];
  public colors: any = ["#009689", "#225450", "#d8b75c", "#D67049", "#D8B75D", "#AC365C", "#5E152C", "#2F6936", "#61A74A", "#2995AB", "#009689", "#225450", "#8A3A24", "#D67049", "#D8B75D", "#AC365C", "#5E152C", "#2F6936", "#61A74A", "#2995AB", "#009689"];
  public data: any = [];
  public retailer: any = {};
  public newArrivals: any = {};
  public newArrivalsChart: any = {};
  public prices: any = {};
  public hasNewArrivalsChart: boolean = false;
  public hasBubbleChart: boolean = false;
  public hasStackedChart: boolean = false;
  public pluginDataLabels = [pluginDataLabels];
  private _onDestroy = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder) {
    for (let i in this.retailers) {
      this.retailer = {};
      this.retailer.name = this.retailers[i];
      this.retailer.dataPoints = this.dataPoints[this.selectedCategory][this.retailers[i]];
      this.retailer.categories = this.labels;
      this.data.push(this.retailer);
    }
    this.newArrivals = {
      "All categories": [
        {company: "HM", count: 103, timestamp: "05-06"},
        {company: "HM", count: 60, timestamp: "09-06"},
        {company: "HM", count: 42, timestamp: "13-06"},
        {company: "HM", count: 55, timestamp: "17-06"},
        {company: "HM", count: 44, timestamp: "21-06"},
        {company: "HM", count: 0, timestamp: "25-06"},
        {company: "HM", count: 16, timestamp: "29-06"},
        {company: "HM", count: 14, timestamp: "03-07"},

        {company: "Uniqlo", count: 99, timestamp: "05-06"},
        {company: "Uniqlo", count: 31, timestamp: "09-06"},
        {company: "Uniqlo", count: 0, timestamp: "13-06"},
        {company: "Uniqlo", count: 56, timestamp: "17-06"},
        {company: "Uniqlo", count: 0, timestamp: "21-06"},
        {company: "Uniqlo", count: 1, timestamp: "25-06"},
        {company: "Uniqlo", count: 5, timestamp: "29-06"},
        {company: "Uniqlo", count: 3, timestamp: "03-07"},

        {company: "Zara", count: 51, timestamp: "05-06"},
        {company: "Zara", count: 2, timestamp: "09-06"},
        {company: "Zara", count: 12, timestamp: "13-06"},
        {company: "Zara", count: 52, timestamp: "17-06"},
        {company: "Zara", count: 71, timestamp: "21-06"},
        {company: "Zara", count: 22, timestamp: "25-06"},
        {company: "Zara", count: 6, timestamp: "29-06"},
        {company: "Zara", count: 7, timestamp: "03-07"},
      ],
      "Dresses": [
        {company: "HM", count: 23, timestamp: "05-06"},
        {company: "HM", count: 19, timestamp: "09-06"},
        {company: "HM", count: 6, timestamp: "13-06"},
        {company: "HM", count: 8, timestamp: "17-06"},
        {company: "HM", count: 10, timestamp: "21-06"},
        {company: "HM", count: 0, timestamp: "25-06"},
        {company: "HM", count: 3, timestamp: "29-06"},
        {company: "HM", count: 3, timestamp: "03-07"},
        {company: "Uniqlo", count: 0, timestamp: "05-06"},
        {company: "Uniqlo", count: 4, timestamp: "09-06"},
        {company: "Uniqlo", count: 0, timestamp: "13-06"},
        {company: "Uniqlo", count: 12, timestamp: "17-06"},
        {company: "Uniqlo", count: 0, timestamp: "21-06"},
        {company: "Uniqlo", count: 0, timestamp: "25-06"},
        {company: "Uniqlo", count: 0, timestamp: "29-06"},
        {company: "Uniqlo", count: 0, timestamp: "03-07"},

        {company: "Zara", count: 7, timestamp: "05-06"},
        {company: "Zara", count: 0, timestamp: "09-06"},
        {company: "Zara", count: 1, timestamp: "13-06"},
        {company: "Zara", count: 14, timestamp: "17-06"},
        {company: "Zara", count: 11, timestamp: "21-06"},
        {company: "Zara", count: 1, timestamp: "25-06"},
        {company: "Zara", count: 2, timestamp: "29-06"},
        {company: "Zara", count: 0, timestamp: "03-07"},
      ],
      "T-shirts": [
        {company: "HM", count: 11, timestamp: "05-06"},
        {company: "HM", count: 2, timestamp: "09-06"},
        {company: "HM", count: 7, timestamp: "13-06"},
        {company: "HM", count: 6, timestamp: "17-06"},
        {company: "HM", count: 8, timestamp: "21-06"},
        {company: "HM", count: 0, timestamp: "25-06"},
        {company: "HM", count: 0, timestamp: "29-06"},
        {company: "HM", count: 5, timestamp: "03-07"},

        {company: "Uniqlo", count: 0, timestamp: "05-06"},
        {company: "Uniqlo", count: 17, timestamp: "09-06"},
        {company: "Uniqlo", count: 0, timestamp: "13-06"},
        {company: "Uniqlo", count: 28, timestamp: "17-06"},
        {company: "Uniqlo", count: 0, timestamp: "21-06"},
        {company: "Uniqlo", count: 0, timestamp: "25-06"},
        {company: "Uniqlo", count: 0, timestamp: "29-06"},
        {company: "Uniqlo", count: 0, timestamp: "03-07"},

        {company: "Zara", count: 1, timestamp: "05-06"},
        {company: "Zara", count: 1, timestamp: "09-06"},
        {company: "Zara", count: 4, timestamp: "13-06"},
        {company: "Zara", count: 0, timestamp: "17-06"},
        {company: "Zara", count: 8, timestamp: "21-06"},
        {company: "Zara", count: 0, timestamp: "25-06"},
        {company: "Zara", count: 0, timestamp: "29-06"},
        {company: "Zara", count: 0, timestamp: "03-07"},
      ]
    };
    this.prices = {
      "All categories": {
        "HM": {
          "1,0 - 1.99": 0.04,
          "2.0 - 2.99": 0.09,
          "3.0 - 3.99": 0.14,
          "4.0 - 4.99": 2.25,
          "5.0 - 5.99": 1.12,
          "6.0 - 6.99": 0.95,
          "7.0 - 7.99": 2.36,
          "8.0 - 8.99": 0.05,
          "9,0 - 9.99": 9.22,
          "10,0 - 10.99": 0,
          "12,0 - 12.99": 3.91,
          "14,0 - 14.99": 12.11,
          "15,0 - 15.99": 0.03,
          "17,0 - 17.99": 3.47,
          "19,0 - 19.99": 15.46,
          "22,0 - 22.99": 0.02,
          "24,0 - 24.99": 11.11,
          "25,0 - 25.99": 0,
          "27,0 - 27.99": 0.12,
          "29,0 - 29.99": 12.58,
          "34,0 - 34.99": 4.77,
          "35,0 - 35.99": 0,
          "39,0 - 39.99": 7.58,
          "44,0 - 44.99": 0.51,
          "45,0 - 45.99": 0,
          "49,0 - 49.99": 4.54,
          "59,0 - 59.99": 2.9,
          "69,0 - 69.99": 1.55,
          "79,0 - 79.99": 1.08,
          "89,0 - 89.99": 0.45,
          "99,0 - 99.99": 0.77,
          "109,0 - 109.99": 0,
          "119,0 - 119.99": 0.02,
          "129,0 - 129.99": 0.26,
          "139,0 - 139.99": 0,
          "149,0 - 149.99": 0.26,
          "159,0 - 159.99": 0,
          "169,0 - 169.99": 0,
          "179,0 - 179.99": 0.8,
          "199,0 - 199.99": 0.9,
          "229,0 - 229.99": 0,
          "239,0 - 239.99": 0,
          "249,0 - 249.99": 0.08,
          "279,0 - 279.99": 0,
          "299,0 - 299.99": 0.2,
          "359,0 - 359.99": 0,
          "399,0 - 399.99": 0
        },
        "Uniqlo": {
          "1,0 - 1.99": 0,
          "2.0 - 2.99": 0,
          "3.0 - 3.99": 0,
          "4.0 - 4.99": 0,
          "5.0 - 5.99": 3.9,
          "6.0 - 6.99": 0,
          "7.0 - 7.99": 2.83,
          "8.0 - 8.99": 0,
          "9,0 - 9.99": 6.41,
          "10,0 - 10.99": 0,
          "12,0 - 12.99": 7.9,
          "14,0 - 14.99": 15,
          "15,0 - 15.99": 0,
          "17,0 - 17.99": 0,
          "19,0 - 19.99": 9.99,
          "22,0 - 22.99": 0,
          "24,0 - 24.99": 11.29,
          "25,0 - 25.99": 0,
          "27,0 - 27.99": 0,
          "29,0 - 29.99": 20.07,
          "34,0 - 34.99": 1.25,
          "35,0 - 35.99": 0,
          "39,0 - 39.99": 10.64,
          "44,0 - 44.99": 0,
          "45,0 - 45.99": 0,
          "49,0 - 49.99": 3.86,
          "59,0 - 59.99": 1.02,
          "69,0 - 69.99": 1.67,
          "79,0 - 79.99": 1.39,
          "89,0 - 89.99": 1.9,
          "99,0 - 99.99": 0.33,
          "109,0 - 109.99": 0,
          "119,0 - 119.99": 0,
          "129,0 - 129.99": 0,
          "139,0 - 139.99": 0,
          "149,0 - 149.99": 0.37,
          "159,0 - 159.99": 0.14,
          "169,0 - 169.99": 0,
          "179,0 - 179.99": 0.05,
          "199,0 - 199.99": 0,
          "229,0 - 229.99": 0,
          "239,0 - 239.99": 0,
          "249,0 - 249.99": 0,
          "279,0 - 279.99": 0,
          "299,0 - 299.99": 0,
          "359,0 - 359.99": 0,
          "399,0 - 399.99": 0
        },
        "Zara": {
          "1,0 - 1.99": 0,
          "2.0 - 2.99": 0,
          "3.0 - 3.99": 0.64,
          "4.0 - 4.99": 0.6,
          "5.0 - 5.99": 2.08,
          "6.0 - 6.99": 0,
          "7.0 - 7.99": 3.16,
          "8.0 - 8.99": 0,
          "9,0 - 9.99": 2.72,
          "10,0 - 10.99": 0.62,
          "12,0 - 12.99": 7.75,
          "14,0 - 14.99": 0,
          "15,0 - 15.99": 6.29,
          "17,0 - 17.99": 4.05,
          "19,0 - 19.99": 9.93,
          "22,0 - 22.99": 0.66,
          "24,0 - 24.99": 0,
          "25,0 - 25.99": 6.79,
          "27,0 - 27.99": 0,
          "29,0 - 29.99": 16.65,
          "34,0 - 34.99": 0,
          "35,0 - 35.99": 0,
          "39,0 - 39.99": 18.9,
          "44,0 - 44.99": 0,
          "45,0 - 45.99": 0.1,
          "49,0 - 49.99": 9.61,
          "59,0 - 59.99": 4.05,
          "69,0 - 69.99": 1.52,
          "79,0 - 79.99": 1.33,
          "89,0 - 89.99": 0.62,
          "99,0 - 99.99": 0.75,
          "109,0 - 109.99": 0,
          "119,0 - 119.99": 0.19,
          "129,0 - 129.99": 0.29,
          "139,0 - 139.99": 0.14,
          "149,0 - 149.99": 0.17,
          "159,0 - 159.99": 0.12,
          "169,0 - 169.99": 0,
          "179,0 - 179.99": 0.02,
          "199,0 - 199.99": 0.12,
          "229,0 - 229.99": 0.08,
          "239,0 - 239.99": 0.04,
          "249,0 - 249.99": 0,
          "279,0 - 279.99": 0,
          "299,0 - 299.99": 0,
          "359,0 - 359.99": 0,
          "399,0 - 399.99": 0.02
        },
      }
    };
  }

  ngOnInit() {
    this.createBubbleChart();
    this.createStackedChart();
    this.createNewArrivalsChart();
    this.initForm();
    this.onChangeForm();
  }

  initForm() {
    this.filtersForm = this.formBuilder.group({
      retailers: [this.retailers],
      categories: [this.selectedCategory],
      timeFrame: [this.timeFrames[0]]
    });
  }

  onChangeForm() {
    this.filtersForm.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(value => {
      this.selectedCategory = value.categories;
      this.selectedRetailers = value.retailers;
      this.data = [];
      for (let i of value.retailers) {
        this.retailer = {};
        this.retailer.name = i;
        this.retailer.dataPoints = this.dataPoints[this.selectedCategory][i];
        this.retailer.categories = this.labels;
        this.data.push(this.retailer);
      }
      this.createStackedChart();
      this.createNewArrivalsChart();
      this.createBubbleChart();
    });
  }

  createStackedChart() {
    this.hasStackedChart = false;
    for (let i of this.data) {
      this.chart[i.name] = {};
      this.chart[i.name].options = {
        maintainAspectRatio: false,
        aspectRatio: 3.3,
        responsive: true,
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            },
          }],
          xAxes: [{
            display: false,
            stacked: true,
            gridLines: {
              display: false,
            },
          }]
        },
        tooltips: {
          mode: "single",
          callbacks: {
            label: (tooltipItem, data) => {
              let label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }
              label += tooltipItem.xLabel + "%";
              return label;
            }
          }
        },
        plugins: {
          datalabels: {
            color: "white",
            display: true,
            formatter: value => value < 5 ? "" : `${value}%`
          }
        },
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 12
          }
        }
      };
      this.chart[i.name].data = [];
      for (let j in i.dataPoints) {
        this.dataset = {};
        this.dataset.data = [];
        this.dataset.data.push(i.dataPoints[j]);
        this.dataset.label = i.categories[j];
        this.dataset.stack = i.name;
        this.dataset.backgroundColor = this.colors[j];
        this.chart[i.name].data.push(this.dataset);
      }
      this.chart[i.name].labels = [];
      this.chart[i.name].labels.push(this.retailers[this.data.indexOf(i)]);
      setTimeout(() => {
        this.hasStackedChart = true;
      });
    }
  }

  createNewArrivalsChart() {
    this.hasNewArrivalsChart = false;
    this.newArrivalsChart = {};
    this.newArrivalsChart.options = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
          },
        }],
        yAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            callback: (tick, index, array) => (index % 2) ? "" : tick
          }
        }]
      },
      legend: {
        labels: {
          boxWidth: 12
        }
      }
    };
    this.newArrivalsChart.data = [];
    this.newArrivalsChart.labels = [];

    for (let i in this.selectedRetailers) {
      let dataSet: any = {};
      let t = [];
      for (let j in this.newArrivals[this.selectedCategory]) {
        if (this.selectedRetailers[i] == this.newArrivals[this.selectedCategory][j].company) {
          t.push(this.newArrivals[this.selectedCategory][j].count);
          this.newArrivalsChart.labels.push(this.newArrivals[this.selectedCategory][j].timestamp);
        }
      }
      dataSet.data = t;
      dataSet.label = this.selectedRetailers[i];
      dataSet.fill = true;
      dataSet.backgroundColor = this.colors[i];
      this.newArrivalsChart.data.push(dataSet);
    }
    this.newArrivalsChart.labels = this.newArrivalsChart.labels.filter(this.onlyUnique);
    setTimeout(() => {
      this.hasNewArrivalsChart = true;
    });
  }

  onlyUnique(value, index, self): any {
    return self.indexOf(value) === index;
  }

  createBubbleChart(): any {
    this.hasBubbleChart = false;
    this.bubbleChart = {};
    this.bubbleChart.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    this.bubbleChart.data = [];
    let spacer = 0.1;
    for (let retailer of this.selectedRetailers) {
      for (let t in this.dataPoints[this.selectedCategory][retailer]) {
        this.dataset = {};
        this.dataset.data = [];
        let bubble: any = {};
        bubble.x = spacer;
        bubble.y = parseInt(t);
        bubble.r = this.dataPoints[this.selectedCategory][retailer][t];
        this.dataset.backgroundColor = this.colors[t];

        this.dataset.data.push(bubble);
        this.bubbleChart.data.push(this.dataset);
      }
      spacer = spacer + 0.1;
    }

    setTimeout(() => {
      this.hasBubbleChart = true;
      console.log(this.bubbleChart);
    });
  }

  onChartClick(e) {
  }
}
