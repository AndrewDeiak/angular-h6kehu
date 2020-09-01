import {HttpClient} from "@angular/common/http";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import * as Chart from "chart.js";
import {ChartDataSets} from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import {Subject} from "rxjs";
import {delay, finalize, takeUntil} from "rxjs/operators";
import {
  AssortmentMix,
  AvailableCategoriesData,
  CalculatedNewInsStatistic,
  CalculatedStatisticData,
  DashboardData,
  NewInsStatistic,
  PriceStructure,
  SelectItem,
  Statistic,
  StatisticData
} from "../../models/dashboard.model";
import {Constants} from "../../utils/constants";
import {MarketingDashboardPopoverComponent} from "../marketing-dashboard-popover/marketing-dashboard-popover.component";

Chart.defaults.global.plugins.datalabels.display = false;

enum TimeFrames {
  LastWeek = "lastWeek",
  LastMoth = "lastMonth",
  CustomPeriod = "customPeriod"
}

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
  public _highestAvgDiscountStatistic: CalculatedStatisticData;
  public _highestMfpStatistic: CalculatedStatisticData;
  public _newInsStatistic: CalculatedNewInsStatistic;
  public _priceStructure: PriceStructure;
  public _constants = Constants;
  public _filtersForm: FormGroup;
  public _isLoading: boolean;
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
    this.http.get("../assets/data.json")
      .pipe(
        delay(2000),
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
    const dialogRef = this.dialog.open(MarketingDashboardPopoverComponent);
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
    if (this.selectedBrands && this.selectedBrands.length && this.selectedCategory && this.selectedTimeFrame) {
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
        const brandData: number[] = newIns.values[brandName];
        const color = this.dashboardData.brandColors[brandName];
        let data: number[];

        switch (this._filtersForm.controls.timeFrame.value.id) {
          case TimeFrames.LastWeek:
            const brandDataLength = brandData.length;
            data = brandData.slice(brandDataLength - this._constants.WEEK_LENGTH);
            this._newInsChart.labels = newIns.timestamps.slice(brandDataLength - this._constants.WEEK_LENGTH);
            break;
          case TimeFrames.LastMoth:
            data = this.getEveryThirdItem(brandData);
            this._newInsChart.labels = this.getEveryThirdItem(newIns.timestamps);
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
  }

  private initStatisticBoxes(): void {
    const statistic = this.availableCategoriesData.statistic;
    this._highestMfpStatistic = this.getMaxValueStatistic(statistic.highestMfp);
    this._highestAvgDiscountStatistic = this.getMaxValueStatistic(statistic.avgDiscount);
    this._newInsStatistic = this.getNewInsStatistic(statistic.newIns);
  }

  private getMaxValueStatistic(statisticData: Statistic): CalculatedStatisticData {
    const selectedBrands = this.selectedBrands.map(item => item.value);
    const selectedStatisticData: StatisticData[] = statisticData.data.filter((item: StatisticData) => selectedBrands.indexOf(item.brand) !== -1);
    const statistic = selectedStatisticData.reduce((prev, current) => (prev.value > current.value) ? prev : current, {
      brand: null,
      value: null
    });
    return {
      ...statistic,
      measurement: statisticData.measurement
    };
  }

  private getNewInsStatistic(statisticData: NewInsStatistic): CalculatedNewInsStatistic {
    const selectedBrands = this.selectedBrands.map(item => item.value);
    const filterSelectedBrand = () => (item: StatisticData) => selectedBrands.indexOf(item.brand) !== -1;
    const reducer = (accumulator: number, currentValue: StatisticData) => accumulator + currentValue.value;

    const currentPeriodData: StatisticData[] = statisticData.currentPeriod.data.filter(filterSelectedBrand());
    const previousPeriodData: StatisticData[] = statisticData.previousPeriod.data.filter(filterSelectedBrand());

    const currentPeriodSum: number = currentPeriodData.reduce(reducer, 0);
    const previousPeriodSum: number = previousPeriodData.reduce(reducer, 0);

    let profit;
    if (previousPeriodSum === 0) {
      profit = currentPeriodSum;
    } else if (currentPeriodSum === 0) {
      profit = -previousPeriodSum;
    } else {
      profit = Math.round(((currentPeriodSum / previousPeriodSum) * 100) - 100);
    }

    return {
      profit: profit > 0 ? `+${profit}%` : `${profit}%`,
      sum: currentPeriodSum,
    };
  }

  private initAssortmentMixChart(): void {
    this._assortmentMixChart.dataSets = [];
    this._assortmentMixChart.labels = [];
    const assortmentMix: AssortmentMix = this.availableCategoriesData.assortmentMix;

    if (assortmentMix) {
      const categoriesLabels: string[] = assortmentMix.categoriesLabels;
      const colors = assortmentMix.colors;

      this._assortmentMixChart.dataSets = categoriesLabels.map((category, categoryIndex) => {
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
