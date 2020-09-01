import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import * as Chart from "chart.js";
import {ChartDataSets} from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {MarketingDashboardPopoverComponent} from "../marketing-dashboard-popover/marketing-dashboard-popover.component";
import {
  AssortmentMix,
  CalculatedNewInsStatistic,
  CalculatedStatisticData,
  DashboardData,
  NewInsStatistic,
  PriceStructure,
  SelectItem,
  Statistic,
  StatisticData
} from "../models/dashboard.model";
import {Constants} from "../utils/constants";

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
  public RESPONSE_DATA: DashboardData = {
    brands: [
      {value: "Zara", locked: false},
      {value: "H&M", locked: false},
      {value: "Uniqlo", locked: false},
      {value: "Mango", locked: true},
      {value: "Nike", locked: true},
      {value: "Asos", locked: true},
      {value: "Gucci", locked: true},
      {value: "Victoria Secret", locked: true},
      {value: "Ralph Lauren", locked: true},
      {value: "+3000 more", locked: true}
    ],
    brandColors: {
      Zara: "#009689",
      Uniqlo: "#225450",
      "H&M": "#d8b75c",
    },
    categories: [
      {value: "All categories", locked: false, id: "all_categories"},
      {value: "Dresses", locked: false, id: "dresses"},
      {value: "T-shirts", locked: false, id: "t_shirts"},
      {value: "Accessories", locked: true, id: "accessories"},
      {value: "Shirts", locked: true, id: "shirts"},
      {value: "Blouses&Shirts", locked: true, id: "blouses"},
      {value: "Trousers", locked: true, id: "trousers"},
      {value: "Jeans", locked: true, id: "jeans"},
      {value: "Knitwear", locked: true, id: "knitwear"},
      {value: "Outerwear", locked: true, id: "outerwear"},
      {value: "Shoes", locked: true, id: "shoes"},
      {value: "Shorts", locked: true, id: "shorts"},
      {value: "Skirts", locked: true, id: "skirts"},
      {value: "+30 categories", locked: true, id: "30_categories"},
    ],
    lastWeek: {
      "All categories": {
        assortmentMix: {
          categoriesLabels: ["Dresses", "T-shirts", "Accessories", "Shirts", "Blouses&Shirts", "Trousers", "Jeans", "Knitwear", "Outerwear", "Shoes", "Shorts", "Shoes", "Shorts", "Skirts", "Others"],
          colors: ["#009689", "#225450", "#d8b75c", "#D67049", "#D8B75D", "#AC365C", "#5E152C", "#2F6936", "#61A74A",
            "#2995AB", "#009689", "#225450", "#8A3A24", "#D67049", "#AC365C"],
          values: {
            Zara: [5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 10, 50, 10],
            "H&M": [1, 1, 19, 2, 1, 1, 4, 3, 2, 1, 14, 1, 50],
            Uniqlo: [1, 8, 12, 2, 1, 1, 4, 3, 2, 1, 14, 1, 50]
          },
        },
        priceStructure: {
          data: [
            {
              priceRange: "€0 - 9.99",
              Zara: 0,
              Uniqlo: 35,
              "H&M": 10,
            },
            {
              priceRange: "€10 - 19.99",
              Zara: 2.5,
              Uniqlo: 5,
              "H&M": 10,
            },
            {
              priceRange: "€20 - 29.99",
              Zara: 2.5,
              Uniqlo: 20,
              "H&M": 5,
            },
            {
              priceRange: "€30 - 39.99",
              Zara: 5,
              Uniqlo: 10,
              "H&M": 25,
            },
            {
              priceRange: "€40 - 49.99",
              Zara: 5,
              Uniqlo: 10,
              "H&M": 40,
            },
            {
              priceRange: "€50+",
              Zara: 85,
              Uniqlo: 20,
              "H&M": 10,
            },
          ],
          displayedColumns: ["Full price structure", "Zara", "Uniqlo", "H&M"],
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
            "H&M": [
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
              {brand: "H&M", value: 7777.77},
              {brand: "Uniqlo", value: 89.11},
            ],
            measurement: "%"
          },
          highestMfp: {
            data: [
              {brand: "Zara", value: 10.99},
              {brand: "H&M", value: 40.45},
              {brand: "Uniqlo", value: 30.45},
            ],
            measurement: "\u20ac"
          },
          newIns: {
            currentPeriod: {
              data: [
                {brand: "Zara", value: 1},
                {brand: "H&M", value: 2},
                {brand: "Uniqlo", value: 3},
              ],
              measurement: null
            },
            previousPeriod: {
              data: [
                {brand: "Zara", value: 0},
                {brand: "H&M", value: 0},
                {brand: "Uniqlo", value: 0},
              ],
              measurement: null
            }
          }
        }
      },
      "T-shirts": {
        assortmentMix: {
          categoriesLabels: ["T-shirt-1", "T-shirt-2", "T-shirt-3"],
          colors: ["#009689", "#225450", "#d8b75c", "#D67049"],
          values: {
            Zara: [33.3, 33.3, 33.4],
            "H&M": [20, 30, 50],
            Uniqlo: [40, 40, 20]
          },
        },
        priceStructure: {
          data: [
            {
              priceRange: "€0 - 9.99",
              Zara: 0,
              Uniqlo: 20,
              "H&M": 10,
            },
            {
              priceRange: "€10 - 19.99",
              Zara: 2.5,
              Uniqlo: 30,
              "H&M": 10,
            },
            {
              priceRange: "€20 - 29.99",
              Zara: 2.5,
              Uniqlo: 10,
              "H&M": 10,
            },
            {
              priceRange: "€30 - 39.99",
              Zara: 5,
              Uniqlo: 10,
              "H&M": 5,
            },
            {
              priceRange: "€40 - 49.99",
              Zara: 5,
              Uniqlo: 10,
              "H&M": 55,
            },
            {
              priceRange: "€50+",
              Zara: 85,
              Uniqlo: 20,
              "H&M": 10,
            },
          ],
          displayedColumns: ["Full price structure", "Zara", "Uniqlo", "H&M"],
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
            "H&M": [
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
              {brand: "H&M", value: 2.77},
              {brand: "Uniqlo", value: 3.11},
            ],
            measurement: "%"
          },
          highestMfp: {
            data: [
              {brand: "Zara", value: 10.99},
              {brand: "H&M", value: 20.45},
              {brand: "Uniqlo", value: 30.45},
            ],
            measurement: "\u20ac"
          },
          newIns: {
            currentPeriod: {
              data: [
                {brand: "Zara", value: 1},
                {brand: "H&M", value: 2},
                {brand: "Uniqlo", value: 3},
              ],
              measurement: null
            },
            previousPeriod: {
              data: [
                {brand: "Zara", value: 4},
                {brand: "H&M", value: 5},
                {brand: "Uniqlo", value: 6},
              ],
              measurement: null
            }
          }
        },
      },
      Dresses: {
        assortmentMix: {
          categoriesLabels: ["Dresses-1", "Dresses-2", "Dresses-3"],
          colors: ["#009689", "#225450", "#d8b75c", "#D67049"],
          values: {
            Zara: [30, 30, 40],
            "H&M": [10, 40, 50],
            Uniqlo: [20, 60, 20]
          },
        },
        priceStructure: {
          data: [
            {
              priceRange: "€0 - 9.99",
              Zara: 10,
              Uniqlo: 35,
              "H&M": 10,
            },
            {
              priceRange: "€10 - 19.99",
              Zara: 2.5,
              Uniqlo: 5,
              "H&M": 10,
            },
            {
              priceRange: "€20 - 29.99",
              Zara: 2.5,
              Uniqlo: 20,
              "H&M": 10,
            },
            {
              priceRange: "€30 - 39.99",
              Zara: 5,
              Uniqlo: 10,
              "H&M": 20,
            },
            {
              priceRange: "€40 - 49.99",
              Zara: 5,
              Uniqlo: 10,
              "H&M": 20,
            },
            {
              priceRange: "€50+",
              Zara: 75,
              Uniqlo: 20,
              "H&M": 30,
            },
          ],
          displayedColumns: ["Full price structure", "Zara", "Uniqlo", "H&M"],
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
            "H&M": [
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
              {brand: "H&M", value: 22.77},
              {brand: "Uniqlo", value: 33.11},
            ],
            measurement: "%"
          },
          highestMfp: {
            data: [
              {brand: "Zara", value: 11.99},
              {brand: "H&M", value: 22.45},
              {brand: "Uniqlo", value: 33.45},
            ],
            measurement: "\u20ac"
          },
          newIns: {
            currentPeriod: {
              data: [
                {brand: "Zara", value: 1},
                {brand: "H&M", value: 2},
                {brand: "Uniqlo", value: 3},
              ],
              measurement: null
            },
            previousPeriod: {
              data: [
                {brand: "Zara", value: 4},
                {brand: "H&M", value: 5},
                {brand: "Uniqlo", value: 6},
              ],
              measurement: null
            }
          }
        },
      }
    },
    lastMonth: {
      "All categories": {
        assortmentMix: {
          categoriesLabels: ["Dresses", "T-shirts", "Accessories", "Shirts", "Blouses&Shirts", "Trousers", "Jeans", "Knitwear", "Outerwear", "Shoes", "Shorts", "Shoes", "Shorts", "Skirts", "Others"],
          colors: ["#009689", "#225450", "#d8b75c", "#D67049", "#D8B75D", "#AC365C", "#5E152C", "#2F6936", "#61A74A",
            "#2995AB", "#009689", "#225450", "#8A3A24", "#D67049", "#AC365C"],
          values: {
            Zara: [40, 4, 3, 2, 1, 5, 4, 3, 2, 1, 10, 15, 10],
            "H&M": [1, 1, 19, 2, 1, 1, 4, 3, 2, 1, 14, 1, 50],
            Uniqlo: [1, 8, 12, 2, 1, 1, 4, 3, 2, 1, 14, 1, 50]
          },
        },
        priceStructure: {
          data: [
            {
              priceRange: "€0 - 9.99",
              Zara: 40,
              Uniqlo: 35,
              "H&M": 10,
            },
            {
              priceRange: "€10 - 19.99",
              Zara: 2.5,
              Uniqlo: 5,
              "H&M": 10,
            },
            {
              priceRange: "€20 - 29.99",
              Zara: 2.5,
              Uniqlo: 20,
              "H&M": 5,
            },
            {
              priceRange: "€30 - 39.99",
              Zara: 5,
              Uniqlo: 10,
              "H&M": 25,
            },
            {
              priceRange: "€40 - 49.99",
              Zara: 5,
              Uniqlo: 10,
              "H&M": 40,
            },
            {
              priceRange: "€50+",
              Zara: 45,
              Uniqlo: 20,
              "H&M": 10,
            },
          ],
          displayedColumns: ["Full price structure", "Zara", "Uniqlo", "H&M"],
          measurement: "%"
        },
        newIns: {
          values: {
            Zara: [
              99, 87, 65, 34, 19,
              21, 21, 72, 1, 24,
              68, 70, 89, 47, 52,
              4, 81, 73, 45, 81,
              72, 100, 26, 76, 16,
              77, 26, 5, 56, 37, 32],
            "H&M": [
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
              {brand: "Zara", value: 10.55},
              {brand: "H&M", value: 877.77},
              {brand: "Uniqlo", value: 89.11},
            ],
            measurement: "%"
          },
          highestMfp: {
            data: [
              {brand: "Zara", value: 22.99},
              {brand: "H&M", value: 99.45},
              {brand: "Uniqlo", value: 30.45},
            ],
            measurement: "\u20ac"
          },
          newIns: {
            currentPeriod: {
              data: [
                {brand: "Zara", value: 100},
                {brand: "H&M", value: 200},
                {brand: "Uniqlo", value: 400},
              ],
              measurement: null
            },
            previousPeriod: {
              data: [
                {brand: "Zara", value: 1000},
                {brand: "H&M", value: 2000},
                {brand: "Uniqlo", value: 355},
              ],
              measurement: null
            }
          }
        }
      },
      "T-shirts": {
        assortmentMix: {
          categoriesLabels: ["T-shirt-1", "T-shirt-2", "T-shirt-3"],
          colors: ["#009689", "#225450", "#d8b75c", "#D67049"],
          values: {
            Zara: [50, 20, 30],
            "H&M": [5, 5, 90],
            Uniqlo: [40, 40, 20]
          },
        },
        priceStructure: {
          data: [
            {
              priceRange: "€0 - 9.99",
              Zara: 0,
              Uniqlo: 20,
              "H&M": 10,
            },
            {
              priceRange: "€10 - 19.99",
              Zara: 2.5,
              Uniqlo: 30,
              "H&M": 10,
            },
            {
              priceRange: "€20 - 29.99",
              Zara: 2.5,
              Uniqlo: 10,
              "H&M": 10,
            },
            {
              priceRange: "€30 - 39.99",
              Zara: 5,
              Uniqlo: 10,
              "H&M": 5,
            },
            {
              priceRange: "€40 - 49.99",
              Zara: 5,
              Uniqlo: 10,
              "H&M": 55,
            },
            {
              priceRange: "€50+",
              Zara: 85,
              Uniqlo: 20,
              "H&M": 10,
            },
          ],
          displayedColumns: ["Full price structure", "Zara", "Uniqlo", "H&M"],
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
            "H&M": [
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
              {brand: "H&M", value: 2.77},
              {brand: "Uniqlo", value: 3.11},
            ],
            measurement: "%"
          },
          highestMfp: {
            data: [
              {brand: "Zara", value: 10.99},
              {brand: "H&M", value: 20.45},
              {brand: "Uniqlo", value: 30.45},
            ],
            measurement: "\u20ac"
          },
          newIns: {
            currentPeriod: {
              data: [
                {brand: "Zara", value: 1},
                {brand: "H&M", value: 2},
                {brand: "Uniqlo", value: 3},
              ],
              measurement: null
            },
            previousPeriod: {
              data: [
                {brand: "Zara", value: 4},
                {brand: "H&M", value: 5},
                {brand: "Uniqlo", value: 6},
              ],
              measurement: null
            }
          }
        },

      },
      Dresses: {
        assortmentMix: {
          categoriesLabels: ["Dresses-1", "Dresses-2", "Dresses-3"],
          colors: ["#009689", "#225450", "#d8b75c", "#D67049"],
          values: {
            Zara: [85, 5, 10],
            "H&M": [20, 30, 50],
            Uniqlo: [20, 60, 20]
          },
        },
        priceStructure: {
          data: [
            {
              priceRange: "€0 - 9.99",
              Zara: 10,
              Uniqlo: 35,
              "H&M": 10,
            },
            {
              priceRange: "€10 - 19.99",
              Zara: 2.5,
              Uniqlo: 5,
              "H&M": 10,
            },
            {
              priceRange: "€20 - 29.99",
              Zara: 2.5,
              Uniqlo: 20,
              "H&M": 10,
            },
            {
              priceRange: "€30 - 39.99",
              Zara: 5,
              Uniqlo: 10,
              "H&M": 20,
            },
            {
              priceRange: "€40 - 49.99",
              Zara: 5,
              Uniqlo: 10,
              "H&M": 20,
            },
            {
              priceRange: "€50+",
              Zara: 75,
              Uniqlo: 20,
              "H&M": 30,
            },
          ],
          displayedColumns: ["Full price structure", "Zara", "Uniqlo", "H&M"],
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
            "H&M": [
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
              {brand: "H&M", value: 22.77},
              {brand: "Uniqlo", value: 33.11},
            ],
            measurement: "%"
          },
          highestMfp: {
            data: [
              {brand: "Zara", value: 11.99},
              {brand: "H&M", value: 22.45},
              {brand: "Uniqlo", value: 33.45},
            ],
            measurement: "\u20ac"
          },
          newIns: {
            currentPeriod: {
              data: [
                {brand: "Zara", value: 1},
                {brand: "H&M", value: 2},
                {brand: "Uniqlo", value: 3},
              ],
              measurement: null
            },
            previousPeriod: {
              data: [
                {brand: "Zara", value: 4},
                {brand: "H&M", value: 5},
                {brand: "Uniqlo", value: 6},
              ],
              measurement: null
            }
          }
        },
      }
    }
  };
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
  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              public dialog: MatDialog) {
  }

  public get selectedBrands(): SelectItem[] {
    return this._filtersForm.controls.brands.value;
  }

  public get selectedCategory(): SelectItem {
    const categories = this._filtersForm.controls.categories.value;
    return categories ? categories : null;
  }

  public get selectedTimeFrame(): SelectItem {
    const timeFrame = this._filtersForm.controls.timeFrame.value;
    return timeFrame ? timeFrame : null;
  }

  public ngOnInit(): void {
    this._filtersForm = this.buildForm();
    this.init();
    this.onChangeForm();
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
    const defaultSelectedBrands = this.RESPONSE_DATA.brands.filter(brand => !brand.locked);
    const defaultSelectedTimeFrame = this._timeFrames.find(timeFrame => timeFrame.id === TimeFrames.LastWeek);
    const defaultSelectedCategory = this.RESPONSE_DATA.categories.find(category => category.id === Constants.ALL_CATEGORIES_ID);

    return this.fb.group({
      brands: [defaultSelectedBrands],
      categories: [defaultSelectedCategory],
      timeFrame: [defaultSelectedTimeFrame],
    });
  }

  private initPriceStructureTable(): void {
    this._priceStructure = this.RESPONSE_DATA[this.selectedTimeFrame.id][this.selectedCategory.value].priceStructure;
    const priceRangeColumn = this._priceStructure.displayedColumns[0];
    const brandsColumns: string[] = this._filtersForm.controls.brands.value.map((item: SelectItem) => item.value);
    this._priceStructure.displayedColumns = [priceRangeColumn, ...brandsColumns];
  }

  private initNewInsChart(): void {
    this._newInsChart.dataSets = [];
    this._newInsChart.labels = [];
    const newIns = this.RESPONSE_DATA[this.selectedTimeFrame.id][this.selectedCategory.value].newIns;

    this._newInsChart.dataSets = this.selectedBrands.map((selectedBrand: SelectItem) => {
      const brandName = selectedBrand.value;
      const brandData: number[] = newIns.values[brandName];
      const color = this.RESPONSE_DATA.brandColors[brandName];
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

  private initStatisticBoxes(): void {
    const statistic = this.RESPONSE_DATA[this.selectedTimeFrame.id][this.selectedCategory.value].statistic;
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
    const assortmentMix: AssortmentMix = this.RESPONSE_DATA[this.selectedTimeFrame.id][this.selectedCategory.value].assortmentMix;
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

  private onChangeForm(): void {
    this._filtersForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.init());
  }

  private init(): void {
    if (this.selectedBrands && this.selectedBrands.length && this.selectedCategory && this.selectedTimeFrame) {
      this.initPriceStructureTable();
      this.initNewInsChart();
      this.initAssortmentMixChart();
      this.initStatisticBoxes();
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
