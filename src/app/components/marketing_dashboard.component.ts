import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as Chart from "chart.js";
import {ChartDataSets} from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import {combineLatest, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {AssortmentMix, DashboardData, PriceStructure, SelectItem, StatisticData} from "../models/dashboard.model";

Chart.defaults.global.plugins.datalabels.display = false;

enum TimeFrames {
  LastWeek = "lastWeek",
  LastMoth = "lastMonth",
  CustomPeriod = "customPeriod"
}

export const WEEK_LENGTH = 7;

@Component({
  selector: "app-marketing-dashboard",
  templateUrl: "./marketing_dashboard.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketingDashboardComponent implements OnInit, OnDestroy {
  public RESPONSE_DATA: DashboardData = {
    brands: [
      {value: "Zara", disabled: false},
      {value: "HM", disabled: false},
      {value: "Uniqlo", disabled: false},
      {value: "Mango", disabled: true},
      {value: "Nike", disabled: true},
      {value: "Asos", disabled: true},
      {value: "Gucci", disabled: true},
      {value: "Victoria Secret", disabled: true},
      {value: "Ralph Lauren", disabled: true},
      {value: "YOUR BRAND", disabled: true}
    ],
    brandColors: {
      Zara: "#009689",
      Uniqlo: "#225450",
      HM: "#d8b75c",
    },
    categories: [
      {value: "All categories", disabled: false},
      {value: "Dresses", disabled: false},
      {value: "T-shirts", disabled: false},
      {value: "Accessories", disabled: true},
      {value: "Shirts", disabled: true},
      {value: "Blouses&Shirts", disabled: true},
      {value: "Trousers", disabled: true},
      {value: "Jeans", disabled: true},
      {value: "Knitwear", disabled: true},
      {value: "Outerwear", disabled: true},
      {value: "Shoes", disabled: true},
      {value: "Shorts", disabled: true},
      {value: "Skirts", disabled: true},
      {value: "Sweatshirts", disabled: true},
      {value: "Underwear", disabled: true},
      {value: "Swimwear", disabled: true},
      {value: "Others", disabled: true},
    ],
    assortmentMix: {
      categoriesLabels: ["Accessories", "Blazers", "Shirts", "Bodysuits", "Dresses", "Jeans", "Jumpsuits", "Knitwear", "Nightwear", "Outerwear", "Polo Shirts", "Shoes", "Shorts", "Skirts", "Socks and Tights", "Sweatshirts", "Swimwear", "T-Shirts", "Trousers", "Underwear", "Others"],
      colors: ["#009689", "#225450", "#d8b75c", "#D67049", "#D8B75D", "#AC365C", "#5E152C", "#2F6936", "#61A74A", "#2995AB", "#009689", "#225450", "#8A3A24", "#D67049", "#D8B75D", "#AC365C", "#5E152C", "#2F6936", "#61A74A", "#2995AB", "#009689"],
      values: {
        Zara: [5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 10, 10, 9, 8, 7, 1, 5, 5, 5, 5, 5],
        HM: [1, 1, 19, 2, 1, 1, 4, 3, 2, 1, 14, 1, 2, 8, 14, 1, 2, 2, 2, 5, 14],
        Uniqlo: [1, 8, 12, 2, 1, 1, 4, 3, 2, 1, 14, 1, 9, 8, 7, 1, 5, 5, 5, 5, 5]
      },
    },
    availableCategories: {
      "All categories": {
        priceStructure: {
          data: [
            {
              priceRange: "€0 - 9.99",
              Zara: 0,
              Uniqlo: 35,
              HM: 10,
            },
            {
              priceRange: "€10 - 19.99",
              Zara: 2.5,
              Uniqlo: 5,
              HM: 10,
            },
            {
              priceRange: "€20 - 29.99",
              Zara: 2.5,
              Uniqlo: 20,
              HM: 5,
            },
            {
              priceRange: "€30 - 39.99",
              Zara: 5,
              Uniqlo: 10,
              HM: 25,
            },
            {
              priceRange: "€40 - 49.99",
              Zara: 5,
              Uniqlo: 10,
              HM: 40,
            },
            {
              priceRange: "€50+",
              Zara: 85,
              Uniqlo: 20,
              HM: 10,
            },
          ],
          displayedColumns: ["Price range", "Zara", "Uniqlo", "HM"],
          measurement: "%"
        },
        newIns: {
          values: {
            Zara: [
              76, 87, 65, 34, 19,
              21, 21, 72, 1, 24,
              68, 70, 89, 47, 52,
              4, 81, 73, 45, 81,
              72, 100, 26, 76, 16,
              77, 26, 5, 56, 37, 32],
            HM: [
              72, 17, 45, 16, 38,
              54, 70, 35, 27, 91,
              93, 86, 29, 82, 91,
              26, 99, 75, 86, 25,
              57, 57, 76, 88, 43,
              6, 20, 47, 39, 43, 99],
            Uniqlo: [
              80, 16, 1, 43, 98,
              92, 65, 69, 13, 73,
              73, 23, 70, 65, 7,
              40, 18, 57, 42, 85,
              16, 15, 47, 52, 59,
              63, 46, 38, 9, 50, 88],
          },
          timestamps: [
            "25 Jul",
            "26 Jul",
            "27 Jul",
            "28 Jul",
            "29 Jul",
            "30 Jul",
            "31 Jul",
            "01 Aug",
            "02 Aug",
            "03 Aug",
            "04 Aug",
            "05 Aug",
            "06 Aug",
            "07 Aug",
            "08 Aug",
            "09 Aug",
            "10 Aug",
            "11 Aug",
            "12 Aug",
            "13 Aug",
            "14 Aug",
            "15 Aug",
            "16 Aug",
            "17 Aug",
            "18 Aug",
            "19 Aug",
            "20 Aug",
            "21 Aug",
            "22 Aug",
            "23 Aug",
            "24 Aug"
          ],
        },
        statistic: {
          avgDiscount: {
            data: [
              {brand: "Zara", value: 2121.55},
              {brand: "HM", value: 7777.77},
              {brand: "Uniqlo", value: 89.11},
            ],
            measurement: "%"
          },
          highestMfp: {
            data: [
              {brand: "Zara", value: 10.99},
              {brand: "HM", value: 40.45},
              {brand: "Uniqlo", value: 30.45},
            ],
            measurement: "\u20ac"
          }
        }
      },
      "T-shirts": {
        priceStructure: {
          data: [
            {
              priceRange: "€0 - 9.99",
              Zara: 0,
              Uniqlo: 20,
              HM: 10,
            },
            {
              priceRange: "€10 - 19.99",
              Zara: 2.5,
              Uniqlo: 30,
              HM: 10,
            },
            {
              priceRange: "€20 - 29.99",
              Zara: 2.5,
              Uniqlo: 10,
              HM: 10,
            },
            {
              priceRange: "€30 - 39.99",
              Zara: 5,
              Uniqlo: 10,
              HM: 5,
            },
            {
              priceRange: "€40 - 49.99",
              Zara: 5,
              Uniqlo: 10,
              HM: 55,
            },
            {
              priceRange: "€50+",
              Zara: 85,
              Uniqlo: 20,
              HM: 10,
            },
          ],
          displayedColumns: ["Price range", "Zara", "Uniqlo", "HM"],
          measurement: "%"
        },
        newIns: {
          values: {
            Zara: [
              76, 87, 65, 34, 19,
              21, 21, 72, 1, 24,
              68, 70, 89, 47, 52,
              4, 81, 73, 45, 81,
              72, 100, 26, 76, 16,
              77, 26, 5, 56, 37, 32],
            HM: [
              72, 17, 45, 16, 38,
              54, 70, 35, 27, 91,
              93, 86, 29, 82, 91,
              26, 99, 75, 86, 25,
              57, 57, 76, 88, 43,
              6, 20, 47, 39, 43, 99],
            Uniqlo: [
              80, 22, 1, 43, 98,
              92, 65, 69, 13, 73,
              73, 23, 70, 65, 7,
              40, 32, 57, 42, 85,
              16, 15, 333, 52, 59,
              63, 46, 38, 9, 999, 88],
          },
          timestamps: [
            "25 Jul",
            "26 Jul",
            "27 Jul",
            "28 Jul",
            "29 Jul",
            "30 Jul",
            "31 Jul",
            "01 Aug",
            "02 Aug",
            "03 Aug",
            "04 Aug",
            "05 Aug",
            "06 Aug",
            "07 Aug",
            "08 Aug",
            "09 Aug",
            "10 Aug",
            "11 Aug",
            "12 Aug",
            "13 Aug",
            "14 Aug",
            "15 Aug",
            "16 Aug",
            "17 Aug",
            "18 Aug",
            "19 Aug",
            "20 Aug",
            "21 Aug",
            "22 Aug",
            "23 Aug",
            "24 Aug"
          ],
        },
        statistic: {
          avgDiscount: {
            data: [
              {brand: "Zara", value: 1.55},
              {brand: "HM", value: 2.77},
              {brand: "Uniqlo", value: 3.11},
            ],
            measurement: "%"
          },
          highestMfp: {
            data: [
              {brand: "Zara", value: 10.99},
              {brand: "HM", value: 20.45},
              {brand: "Uniqlo", value: 30.45},
            ],
            measurement: "\u20ac"
          }
        },

      },
      Dresses: {
        priceStructure: {
          data: [
            {
              priceRange: "€0 - 9.99",
              Zara: 10,
              Uniqlo: 35,
              HM: 10,
            },
            {
              priceRange: "€10 - 19.99",
              Zara: 2.5,
              Uniqlo: 5,
              HM: 10,
            },
            {
              priceRange: "€20 - 29.99",
              Zara: 2.5,
              Uniqlo: 20,
              HM: 10,
            },
            {
              priceRange: "€30 - 39.99",
              Zara: 5,
              Uniqlo: 10,
              HM: 20,
            },
            {
              priceRange: "€40 - 49.99",
              Zara: 5,
              Uniqlo: 10,
              HM: 20,
            },
            {
              priceRange: "€50+",
              Zara: 75,
              Uniqlo: 20,
              HM: 30,
            },
          ],
          displayedColumns: ["Price range", "Zara", "Uniqlo", "HM"],
          measurement: "%"
        },
        newIns: {
          values: {
            Zara: [
              76, 87, 65, 34, 19,
              21, 21, 72, 1, 24,
              68, 70, 89, 47, 52,
              4, 81, 73, 45, 81,
              72, 100, 26, 76, 16,
              77, 26, 5, 56, 37, 32],
            HM: [
              72, 17, 45, 16, 38,
              54, 70, 35, 27, 91,
              93, 86, 29, 82, 91,
              26, 99, 75, 86, 25,
              57, 57, 76, 88, 43,
              6, 20, 47, 39, 43, 99],
            Uniqlo: [
              80, 16, 1, 43, 98,
              92, 32, 69, 13, 73,
              73, 23, 70, 112, 7,
              40, 18, 57, 42, 85,
              16, 15, 47, 52, 59,
              63, 23, 38, 9, 123, 1],
          },
          timestamps: [
            "25 Jul",
            "26 Jul",
            "27 Jul",
            "28 Jul",
            "29 Jul",
            "30 Jul",
            "31 Jul",
            "01 Aug",
            "02 Aug",
            "03 Aug",
            "04 Aug",
            "05 Aug",
            "06 Aug",
            "07 Aug",
            "08 Aug",
            "09 Aug",
            "10 Aug",
            "11 Aug",
            "12 Aug",
            "13 Aug",
            "14 Aug",
            "15 Aug",
            "16 Aug",
            "17 Aug",
            "18 Aug",
            "19 Aug",
            "20 Aug",
            "21 Aug",
            "22 Aug",
            "23 Aug",
            "24 Aug"
          ],
        },
        statistic: {
          avgDiscount: {
            data: [
              {brand: "Zara", value: 11.55},
              {brand: "HM", value: 22.77},
              {brand: "Uniqlo", value: 33.11},
            ],
            measurement: "%"
          },
          highestMfp: {
            data: [
              {brand: "Zara", value: 11.99},
              {brand: "HM", value: 22.45},
              {brand: "Uniqlo", value: 33.45},
            ],
            measurement: "\u20ac"
          }
        },
      }
    },
  };
  public timeFrames: SelectItem[] = [
    {
      id: TimeFrames.LastWeek,
      value: "Last week",
      disabled: false
    },
    {
      id: TimeFrames.LastMoth,
      value: "Last month",
      disabled: false
    },
    {
      id: TimeFrames.CustomPeriod,
      value: "Custom period",
      disabled: true
    }
  ];
  public chartsPlugins = [pluginDataLabels];
  public assortmentMixChart = {
    options: {
      scaleShowLabels: false,
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        yAxes: [{
          stacked: true,
          gridLines: {display: false},
        }],
        xAxes: [{
          display: false,
          stacked: true,
          gridLines: {display: false},
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
          },
        }
      },
      plugins: {
        datalabels: {
          color: "white",
          display: true,
          clip: true,
          formatter: value => value < 5 ? "" : `${value}%`
        }
      },
      legend: {
        position: "bottom",
        labels: {boxWidth: 12}
      },
    },
    dataSets: null,
    labels: null,
  };
  public newInsChart = {
    options: {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {display: false},
        }],
        yAxes: [{
          gridLines: {display: false},
          ticks: {
            beginAtZero: true,
            callback: (tick, index, array) => (index % 2) ? "" : tick
          }
        }]
      },
      legend: {
        labels: {boxWidth: 12},
        position: "bottom"
      }
    },
    dataSets: null,
    labels: null,
  };
  public filtersForm: FormGroup;
  public highestAvgDiscount: StatisticData = null;
  public highestMfp: StatisticData = null;
  public priceStructure: PriceStructure = null;
  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
  }

  public get selectedBrands(): SelectItem[] {
    return this.filtersForm.controls.brands.value;
  }

  public get selectedCategory(): string {
    const categories = this.filtersForm.controls.categories.value;
    return categories ? categories.value : null;
  }

  public get selectedTimeFrame(): string {
    const timeFrame = this.filtersForm.controls.timeFrame.value;
    return timeFrame ? timeFrame.value : null;
  }

  public ngOnInit(): void {
    this.filtersForm = this.buildForm();
    this.onChangeForm();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
    this.unsubscribe$.complete();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      brands: null,
      categories: null,
      timeFrame: null,
    });
  }

  private onChangeForm(): void {
    const formControls = this.filtersForm.controls;
    this.filtersForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(formGroup => {
      if (this.selectedBrands && this.selectedBrands.length && this.selectedCategory && this.selectedTimeFrame) {
        this.priceStructure = this.RESPONSE_DATA.availableCategories[this.selectedCategory].priceStructure;
        const priceRangeColumn = this.RESPONSE_DATA.availableCategories[this.selectedCategory].priceStructure.displayedColumns[0];
        const brands = formGroup.brands.map(item => item.value);
        this.RESPONSE_DATA.availableCategories[this.selectedCategory].priceStructure.displayedColumns = [priceRangeColumn, ...brands];
        const statistic = this.RESPONSE_DATA.availableCategories[this.selectedCategory].statistic;
        this.highestMfp = this.getMaxValueStatistic(statistic.highestMfp.data);
        this.highestAvgDiscount = this.getMaxValueStatistic(statistic.avgDiscount.data);
        this.initNewInsChart();
      }
    });

    combineLatest([formControls.brands.valueChanges, formControls.timeFrame.valueChanges])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([brands, timeFrame]: [string[], string]) => {
        if (brands && brands.length && timeFrame) {
          this.initAssortmentMixChart();
        }
      });
  }

  private getMaxValueStatistic(statisticData: StatisticData[]): StatisticData {
    const selectedBrands = this.selectedBrands.map(item => item.value);
    const selectedStatisticData: StatisticData[] = statisticData.filter((item: StatisticData) => selectedBrands.indexOf(item.brand) !== -1);
    return selectedStatisticData.reduce((prev, current) => (prev.value > current.value) ? prev : current, {brand: null, value: null});
  }

  private initAssortmentMixChart(): void {
    this.assortmentMixChart.dataSets = [];
    this.assortmentMixChart.labels = [];
    const assortmentMix: AssortmentMix = this.RESPONSE_DATA.assortmentMix;
    const categoriesLabels: string[] = assortmentMix.categoriesLabels;
    const colors = assortmentMix.colors;

    this.assortmentMixChart.dataSets = categoriesLabels.map((category, categoryIndex) => {
      const data: number[] = this.selectedBrands.map(selectedBrand => assortmentMix.values[selectedBrand.value][categoryIndex]);
      const color = colors[categoryIndex];

      return {
        label: category,
        data,
        backgroundColor: color,
        hoverBackgroundColor: color,
        hoverBorderColor: color,
        borderColor: color
      } as ChartDataSets;
    });
    this.assortmentMixChart.labels = this.selectedBrands.map(item => item.value);
  }

  private initNewInsChart(): void {
    this.newInsChart.dataSets = [];
    this.newInsChart.labels = [];
    const newIns = this.RESPONSE_DATA.availableCategories[this.selectedCategory].newIns;

    this.newInsChart.dataSets = this.selectedBrands.map((selectedBrand: SelectItem) => {
      const brandName = selectedBrand.value;
      const brandData: number[] = newIns.values[brandName];
      const color = this.RESPONSE_DATA.brandColors[brandName];
      let data: number[];

      switch (this.filtersForm.controls.timeFrame.value.id) {
        case TimeFrames.LastWeek:
          const brandDataLength = brandData.length;
          data = brandData.slice(brandDataLength - WEEK_LENGTH);
          this.newInsChart.labels = newIns.timestamps.slice(brandDataLength - WEEK_LENGTH);
          break;
        case TimeFrames.LastMoth:
          data = this.getEveryThirdItem(brandData);
          this.newInsChart.labels = this.getEveryThirdItem(newIns.timestamps);
          break;
      }

      return {
        label: brandName,
        data,
        backgroundColor: color,
        hoverBackgroundColor: color,
        hoverBorderColor: color,
        borderColor: color
      } as ChartDataSets;
    });
  }

  private getEveryThirdItem<T>(data: Array<T>): Array<T> {
    return data.filter((item, index) => index % 3 === 0);
  }
}
