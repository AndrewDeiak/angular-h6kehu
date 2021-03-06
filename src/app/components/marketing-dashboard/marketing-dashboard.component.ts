import {HttpClient} from "@angular/common/http";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import * as Chart from "chart.js";
import {ChartDataSets} from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import {Subject} from "rxjs";
import {finalize, takeUntil} from "rxjs/operators";
import {
  AssortmentMix,
  AvailableCategoriesData,
  DashboardData,
  HiddenCharts,
  PriceStructure,
  SelectItem,
  Statistic,
} from "../../models/dashboard.model";
import {Constants} from "../../utils/constants";
import {MarketingDashboardPopoverComponent} from "../marketing-dashboard-popover/marketing-dashboard-popover.component";

Chart.defaults.global.plugins.datalabels.display = false;

enum TimeFrames {
  LastWeek = "lastWeek",
  LastMoth = "lastMonth",
  CustomPeriod = "customPeriod"
}

const ASSETS_PATH = "../../../";

function onHoverChartElements(event, elements): void {
  event.target.style.cursor = elements[0] ? "pointer" : "default";
}

function onHoverLegend(event, legendItem): void {
  event.target.style.cursor = legendItem ? "pointer" : "default";
}

@Component({
  selector: "app-marketing-dashboard",
  templateUrl: "./marketing-dashboard.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketingDashboardComponent implements OnInit, OnDestroy {
  public dashboardData: DashboardData;
  public _timeFrames: SelectItem[] = [
    {
      id: TimeFrames.LastWeek,
      value: "Last week",
      locked: false
    },
    {
      id: TimeFrames.LastMoth,
      value: "Last month",
      locked: false
    },
    {
      id: TimeFrames.CustomPeriod,
      value: "Custom period",
      locked: true
    }
  ];
  public _chartsPlugins = [pluginDataLabels];
  public _assortmentMixChart = {
    options: {
      scaleShowLabels: false,
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        yAxes: [{
          stacked: true,
          gridLines: {display: false},
          ticks: {
            fontFamily: "Gotham Medium",
            fontSize: 13,
            fontColor: "rgba(0,0,0,.54)"
          }
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
        labels: {boxWidth: 12},
        onHover: onHoverLegend,
      },
      onClick: this.onClickChartElement.bind(this),
    },
    onHover: onHoverChartElements,
    dataSets: null,
    labels: null,
  };
  public _newInsChart = {
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
        position: "bottom",
        onHover: onHoverLegend,
      },
      onHover: onHoverChartElements,
      onClick: this.onClickChartElement.bind(this),
    },
    dataSets: null,
    labels: null,
  };
  public _highestAvgDiscountStatistic: [string, number];
  public _highestAvgPriceStatistic: [string, number];
  public _newInsStatistic: number;
  public _priceStructure: PriceStructure;
  public _constants = Constants;
  public _filtersForm: FormGroup;
  public _isLoading: boolean;
  public _hiddenCharts: HiddenCharts[] = [
    {
      img: `${ASSETS_PATH}assets/img/average-price-hidden.jpg`,
      title: "Average price",
      subTitle: "Average price per category"
    },
    {
      img: `${ASSETS_PATH}assets/img/discount-evolution-hidden.jpg`,
      title: "Discount evolution",
      subTitle: "Discount structure per brand"
    },
    {
      img: `${ASSETS_PATH}assets/img/colors-hidden.jpg`,
      title: "Colors",
      subTitle: "Colors structure per brand"
    },
    {
      img: `${ASSETS_PATH}assets/img/sell-out-hidden.jpg`,
      title: "Sell out",
      subTitle: "Sell out structure per brand"
    },
    {
      img: `${ASSETS_PATH}assets/img/stock-hidden.jpg`,
      title: "Stock",
      subTitle: "Stock structure per brand"
    },
    {
      img: `${ASSETS_PATH}assets/img/fabrics-hidden.jpg`,
      title: "Fabrics",
      subTitle: "Fabrics structure per brand"
    }
  ];
  private unsubscribe$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private http: HttpClient) {
  }

  public get selectedBrands(): SelectItem[] {
    return this._filtersForm.controls.brands.value;
  }

  public get selectedCategory(): SelectItem {
    const categories = this._filtersForm.controls.categories.value;
    return categories ? categories : null;
  }

  public get allFiltersSelected(): boolean {
    return !!(this._filtersForm && this.selectedBrands && this.selectedBrands.length && this.selectedCategory && this.selectedTimeFrame);
  }

  public get selectedTimeFrame(): SelectItem {
    const timeFrame = this._filtersForm.controls.timeFrame.value;
    return timeFrame ? timeFrame : null;
  }

  public get availableCategoriesData(): AvailableCategoriesData {
    return this.dashboardData[this.selectedTimeFrame.id][this.selectedCategory.value];
  }

  public ngOnInit(): void {
    this._isLoading = true;
    // TODO: remove delay after connect to the real server
    this.http.get("https://dash.retviews.com/get_data")
      .pipe(
        finalize(() => {
          this._isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe((response: DashboardData) => {
        this.dashboardData = response;
        this._filtersForm = this.buildForm();
        this.init();
        this.onChangeForm();
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
    this.unsubscribe$.complete();
  }

  public _onControlOptionClick(locked: boolean): void {
    if (locked) {
      window.open("https://google.com");
    }
  }

  public _openPointDetails(): void {
    const dialogRef = this.dialog.open(MarketingDashboardPopoverComponent, {backdropClass: "overlay-marketing-dashboard-popover"});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private buildForm(): FormGroup {
    const defaultSelectedBrands = this.dashboardData.brands.filter(brand => !brand.locked);
    const defaultSelectedTimeFrame = this._timeFrames.find(timeFrame => timeFrame.id === TimeFrames.LastWeek);
    const defaultSelectedCategory = this.dashboardData.categories.find(category => category.id === Constants.ALL_CATEGORIES_ID);

    return this.fb.group({
      brands: [defaultSelectedBrands],
      categories: [defaultSelectedCategory],
      timeFrame: [defaultSelectedTimeFrame],
    });
  }

  private init(): void {
    if (this.allFiltersSelected) {
      this.initPriceStructureTable();
      this.initNewInsChart();
      this.initAssortmentMixChart();
      this.initStatisticBoxes();
    }
  }

  private onChangeForm(): void {
    this._filtersForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.init());
  }

  private initPriceStructureTable(): void {
    this._priceStructure = this.availableCategoriesData.priceStructure;
    if (this._priceStructure) {
      const priceRangeColumn = this._priceStructure.displayedColumns[0];
      const brandsColumns: string[] = this._filtersForm.controls.brands.value.map((item: SelectItem) => item.value);
      this._priceStructure.displayedColumns = [priceRangeColumn, ...brandsColumns];
    }
  }

  private initNewInsChart(): void {
    this._newInsChart.dataSets = [];
    this._newInsChart.labels = [];
    const newIns = this.availableCategoriesData.newIns;

    if (newIns) {
      this._newInsChart.dataSets = this.selectedBrands.map((selectedBrand: SelectItem) => {
        const brandName = selectedBrand.value;
        const brandData: number[] = newIns.data[brandName];
        const color = this.dashboardData.brandColors[brandName];
        let data: number[];

        switch (this._filtersForm.controls.timeFrame.value.id) {
          case TimeFrames.LastWeek:
            data = brandData;
            this._newInsChart.labels = newIns.timestamps;
            break;
          case TimeFrames.LastMoth:
            data = this.getEveryThirdItem(brandData);
            this._newInsChart.labels = this.getEveryThirdItem(newIns.timestamps);
            break;
        }

        return {
          label: brandName,
          data: (data && data.length) ? data : [],
          backgroundColor: color,
          hoverBackgroundColor: color,
          hoverBorderColor: color,
          borderColor: color
        } as ChartDataSets;
      });
    }
  }

  private initStatisticBoxes(): void {
    const statistic = this.availableCategoriesData.statistic;
    this._highestAvgPriceStatistic = this.getMaxValueStatistic(statistic.avgPrice);
    this._highestAvgDiscountStatistic = this.getMaxValueStatistic(statistic.avgDiscount);
    this._newInsStatistic = this.getNewInsStatistic(statistic.newIns);
  }

  private getMaxValueStatistic(statisticData: Statistic): [string, number] {
    const selectedBrands = this.selectedBrands.map(item => item.value);
    const filteredStatisticPerBrand = this.filterStatisticPerBrand(statisticData, selectedBrands);

    const maxValue = Object.entries(filteredStatisticPerBrand)
      .reduce((prev, current) => (prev[1] > current[1]) ? prev : current) as [string, number];
    return maxValue;
  }

  private getNewInsStatistic(statisticData: Statistic): number {
    const selectedBrands = this.selectedBrands.map(item => item.value);
    const filteredStatisticPerBrand = this.filterStatisticPerBrand(statisticData, selectedBrands);

    const newIns = Object.values(filteredStatisticPerBrand)
      .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0) as number;
    return newIns;
  }

  private filterStatisticPerBrand(statisticData: Statistic, selectedBrands: string[]): Statistic {
    return Object.keys(statisticData).reduce((filtered, key) => {
      if (selectedBrands.includes(key)) {
        filtered[key] = statisticData[key];
      }
      return filtered;
    }, {});
  }

  private initAssortmentMixChart(): void {
    this._assortmentMixChart.dataSets = [];
    this._assortmentMixChart.labels = [];
    const assortmentMix: AssortmentMix = this.availableCategoriesData.assortmentMix;

    if (assortmentMix) {
      const categoriesLabels: string[] = assortmentMix.categoriesLabels;
      const colors = assortmentMix.colors;

      this._assortmentMixChart.dataSets = categoriesLabels.map((category, categoryIndex) => {
        const data: number[] = this.selectedBrands.map(selectedBrand => assortmentMix.data[selectedBrand.value][categoryIndex]);
        const color = colors[categoryIndex];

        return {
          label: category,
          data: (data && data.length) ? data : [],
          backgroundColor: color,
          hoverBackgroundColor: color,
          hoverBorderColor: color,
          borderColor: color
        } as ChartDataSets;
      });
      this._assortmentMixChart.labels = this.selectedBrands.map(item => item.value);
    }
  }

  private getEveryThirdItem<T>(data: Array<T>): Array<T> {
    return data.filter((item, index) => index % 3 === 0);
  }

  private onClickChartElement(event, array): void {
    if (array && array.length) {
      this._openPointDetails();
    }
  }
}
