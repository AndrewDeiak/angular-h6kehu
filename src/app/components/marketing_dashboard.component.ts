import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as Chart from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {DashboardData, PriceStructure, SelectItem, StatisticData} from "../models/dashboard.model";

Chart.defaults.global.plugins.datalabels.display = false;

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
        newIns: [
          {
            count: 0,
            company: "Zara",
            timestamp: "25-07-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "26-07-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "27-07-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "28-07-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "29-07-2020"
          },
          {
            count: 2,
            company: "Zara",
            timestamp: "30-07-2020"
          },
          {
            count: 8,
            company: "Zara",
            timestamp: "31-07-2020"
          },
          {
            count: 10,
            company: "Zara",
            timestamp: "01-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "02-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "03-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "04-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "05-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "06-08-2020"
          },
          {
            count: 6,
            company: "Zara",
            timestamp: "07-08-2020"
          },
          {
            count: 10,
            company: "Zara",
            timestamp: "08-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "09-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "10-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "11-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "12-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "13-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "14-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "15-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "16-08-2020"
          },
          {
            count: 13,
            company: "Zara",
            timestamp: "17-08-2020"
          },
          {
            count: 15,
            company: "Zara",
            timestamp: "18-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "19-08-2020"
          },
          {
            count: 13,
            company: "Zara",
            timestamp: "20-08-2020"
          },
          {
            count: 3,
            company: "Zara",
            timestamp: "21-08-2020"
          },
          {
            count: 1,
            company: "Zara",
            timestamp: "22-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "23-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "24-08-2020"
          },
          {
            count: 22,
            company: "HM",
            timestamp: "25-07-2020"
          },
          {
            count: 41,
            company: "HM",
            timestamp: "26-07-2020"
          },
          {
            count: 7,
            company: "HM",
            timestamp: "27-07-2020"
          },
          {
            count: 58,
            company: "HM",
            timestamp: "28-07-2020"
          },
          {
            count: 38,
            company: "HM",
            timestamp: "29-07-2020"
          },
          {
            count: 44,
            company: "HM",
            timestamp: "30-07-2020"
          },
          {
            count: 105,
            company: "HM",
            timestamp: "31-07-2020"
          },
          {
            count: 38,
            company: "HM",
            timestamp: "01-08-2020"
          },
          {
            count: 74,
            company: "HM",
            timestamp: "02-08-2020"
          },
          {
            count: 2,
            company: "HM",
            timestamp: "03-08-2020"
          },
          {
            count: 4,
            company: "HM",
            timestamp: "04-08-2020"
          },
          {
            count: 145,
            company: "HM",
            timestamp: "05-08-2020"
          },
          {
            count: 116,
            company: "HM",
            timestamp: "06-08-2020"
          },
          {
            count: 116,
            company: "HM",
            timestamp: "07-08-2020"
          },
          {
            count: 116,
            company: "HM",
            timestamp: "08-08-2020"
          },
          {
            count: 116,
            company: "HM",
            timestamp: "09-08-2020"
          },
          {
            count: 116,
            company: "HM",
            timestamp: "10-08-2020"
          },
          {
            count: 116,
            company: "HM",
            timestamp: "11-08-2020"
          },
          {
            count: 116,
            company: "HM",
            timestamp: "12-08-2020"
          },
          {
            count: 122,
            company: "HM",
            timestamp: "13-08-2020"
          },
          {
            count: 95,
            company: "HM",
            timestamp: "14-08-2020"
          },
          {
            count: 12,
            company: "HM",
            timestamp: "15-08-2020"
          },
          {
            count: 6,
            company: "HM",
            timestamp: "16-08-2020"
          },
          {
            count: 24,
            company: "HM",
            timestamp: "17-08-2020"
          },
          {
            count: 1,
            company: "HM",
            timestamp: "18-08-2020"
          },
          {
            count: 122,
            company: "HM",
            timestamp: "19-08-2020"
          },
          {
            count: 20,
            company: "HM",
            timestamp: "20-08-2020"
          },
          {
            count: 65,
            company: "HM",
            timestamp: "21-08-2020"
          },
          {
            count: 15,
            company: "HM",
            timestamp: "22-08-2020"
          },
          {
            count: 0,
            company: "HM",
            timestamp: "23-08-2020"
          },
          {
            count: 0,
            company: "HM",
            timestamp: "24-08-2020"
          },
          {
            count: 3,
            company: "Uniqlo",
            timestamp: "25-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "26-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "27-07-2020"
          },
          {
            count: 36,
            company: "Uniqlo",
            timestamp: "28-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "29-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "30-07-2020"
          },
          {
            count: 6,
            company: "Uniqlo",
            timestamp: "31-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "01-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "02-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "03-08-2020"
          },
          {
            count: 188,
            company: "Uniqlo",
            timestamp: "04-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "05-08-2020"
          },
          {
            count: 9,
            company: "Uniqlo",
            timestamp: "06-08-2020"
          },
          {
            count: 28,
            company: "Uniqlo",
            timestamp: "07-08-2020"
          },
          {
            count: 3,
            company: "Uniqlo",
            timestamp: "08-08-2020"
          },
          {
            count: 3,
            company: "Uniqlo",
            timestamp: "09-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "10-08-2020"
          },
          {
            count: 4,
            company: "Uniqlo",
            timestamp: "11-08-2020"
          },
          {
            count: 7,
            company: "Uniqlo",
            timestamp: "12-08-2020"
          },
          {
            count: 5,
            company: "Uniqlo",
            timestamp: "13-08-2020"
          },
          {
            count: 2,
            company: "Uniqlo",
            timestamp: "14-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "15-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "16-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "17-08-2020"
          },
          {
            count: 7,
            company: "Uniqlo",
            timestamp: "18-08-2020"
          },
          {
            count: 46,
            company: "Uniqlo",
            timestamp: "19-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "20-08-2020"
          },
          {
            count: 2,
            company: "Uniqlo",
            timestamp: "21-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "22-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "23-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "24-08-2020"
          },
        ],
        assortmentMix: [
          {
            data: [20, 5, 5],
            label: "Accessories",
            color: "#009689",
          },
          {
            data: [5, 5, 20],
            label: "Dresses",
            color: "#225450",
          },
          {
            data: [2, 5, 5],
            label: "Blouses&Shirts",
            color: "#d8b75c",
          },
          {
            data: [2, 20, 5],
            label: "Trousers",
            color: "#D67049",
          },
          {
            data: [11, 5, 5],
            label: "Jeans",
            color: "#D8B75D",
          },
          {
            data: [5, 5, 5],
            label: "Knitwear",
            color: "#AC365C",
          },
          {
            data: [5, 5, 5],
            label: "Outerwear",
            color: "#5E152C",
          },
          {
            data: [5, 5, 5],
            label: "Shoes",
            color: "#2F6936",
          },
          {
            data: [5, 5, 5],
            label: "Shorts",
            color: "#61A74A",
          },
          {
            data: [5, 5, 5],
            label: "Skirts",
            color: "#2995AB",
          },
          {
            data: [5, 5, 5],
            label: "Sweatshirts",
            color: "#009689",
          },
          {
            data: [5, 5, 5],
            label: "T-shirts",
            color: "#225450",
          },
          {
            data: [5, 5, 5],
            label: "Underwear",
            color: "#8A3A24",
          },
          {
            data: [5, 5, 5],
            label: "Swimwear",
            color: "#D67049",
          },
          {
            data: [5, 5, 5],
            label: "Others",
            color: "#D8B75D",
          },
        ],
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
        newIns: [
          {
            count: 150,
            company: "Zara",
            timestamp: "25-07-2020"
          },
          {
            count: 140,
            company: "Zara",
            timestamp: "26-07-2020"
          },
          {
            count: 130,
            company: "Zara",
            timestamp: "27-07-2020"
          },
          {
            count: 120,
            company: "Zara",
            timestamp: "28-07-2020"
          },
          {
            count: 70,
            company: "Zara",
            timestamp: "29-07-2020"
          },
          {
            count: 2,
            company: "Zara",
            timestamp: "30-07-2020"
          },
          {
            count: 80,
            company: "Zara",
            timestamp: "31-07-2020"
          },
          {
            count: 10,
            company: "Zara",
            timestamp: "01-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "02-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "03-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "04-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "05-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "06-08-2020"
          },
          {
            count: 6,
            company: "Zara",
            timestamp: "07-08-2020"
          },
          {
            count: 10,
            company: "Zara",
            timestamp: "08-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "09-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "10-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "11-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "12-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "13-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "14-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "15-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "16-08-2020"
          },
          {
            count: 13,
            company: "Zara",
            timestamp: "17-08-2020"
          },
          {
            count: 15,
            company: "Zara",
            timestamp: "18-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "19-08-2020"
          },
          {
            count: 13,
            company: "Zara",
            timestamp: "20-08-2020"
          },
          {
            count: 3,
            company: "Zara",
            timestamp: "21-08-2020"
          },
          {
            count: 1,
            company: "Zara",
            timestamp: "22-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "23-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "24-08-2020"
          },
          {
            count: 22,
            company: "HM",
            timestamp: "25-07-2020"
          },
          {
            count: 41,
            company: "HM",
            timestamp: "26-07-2020"
          },
          {
            count: 7,
            company: "HM",
            timestamp: "27-07-2020"
          },
          {
            count: 58,
            company: "HM",
            timestamp: "28-07-2020"
          },
          {
            count: 38,
            company: "HM",
            timestamp: "29-07-2020"
          },
          {
            count: 44,
            company: "HM",
            timestamp: "30-07-2020"
          },
          {
            count: 105,
            company: "HM",
            timestamp: "31-07-2020"
          },
          {
            count: 38,
            company: "HM",
            timestamp: "01-08-2020"
          },
          {
            count: 74,
            company: "HM",
            timestamp: "02-08-2020"
          },
          {
            count: 2,
            company: "HM",
            timestamp: "03-08-2020"
          },
          {
            count: 4,
            company: "HM",
            timestamp: "04-08-2020"
          },
          {
            count: 145,
            company: "HM",
            timestamp: "05-08-2020"
          },
          {
            count: 116,
            company: "HM",
            timestamp: "06-08-2020"
          },
          {
            count: 61,
            company: "HM",
            timestamp: "07-08-2020"
          },
          {
            count: 58,
            company: "HM",
            timestamp: "08-08-2020"
          },
          {
            count: 9,
            company: "HM",
            timestamp: "09-08-2020"
          },
          {
            count: 35,
            company: "HM",
            timestamp: "10-08-2020"
          },
          {
            count: 69,
            company: "HM",
            timestamp: "11-08-2020"
          },
          {
            count: 106,
            company: "HM",
            timestamp: "12-08-2020"
          },
          {
            count: 122,
            company: "HM",
            timestamp: "13-08-2020"
          },
          {
            count: 95,
            company: "HM",
            timestamp: "14-08-2020"
          },
          {
            count: 12,
            company: "HM",
            timestamp: "15-08-2020"
          },
          {
            count: 6,
            company: "HM",
            timestamp: "16-08-2020"
          },
          {
            count: 24,
            company: "HM",
            timestamp: "17-08-2020"
          },
          {
            count: 1,
            company: "HM",
            timestamp: "18-08-2020"
          },
          {
            count: 122,
            company: "HM",
            timestamp: "19-08-2020"
          },
          {
            count: 20,
            company: "HM",
            timestamp: "20-08-2020"
          },
          {
            count: 65,
            company: "HM",
            timestamp: "21-08-2020"
          },
          {
            count: 15,
            company: "HM",
            timestamp: "22-08-2020"
          },
          {
            count: 0,
            company: "HM",
            timestamp: "23-08-2020"
          },
          {
            count: 0,
            company: "HM",
            timestamp: "24-08-2020"
          },
          {
            count: 3,
            company: "Uniqlo",
            timestamp: "25-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "26-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "27-07-2020"
          },
          {
            count: 36,
            company: "Uniqlo",
            timestamp: "28-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "29-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "30-07-2020"
          },
          {
            count: 6,
            company: "Uniqlo",
            timestamp: "31-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "01-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "02-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "03-08-2020"
          },
          {
            count: 188,
            company: "Uniqlo",
            timestamp: "04-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "05-08-2020"
          },
          {
            count: 9,
            company: "Uniqlo",
            timestamp: "06-08-2020"
          },
          {
            count: 28,
            company: "Uniqlo",
            timestamp: "07-08-2020"
          },
          {
            count: 3,
            company: "Uniqlo",
            timestamp: "08-08-2020"
          },
          {
            count: 3,
            company: "Uniqlo",
            timestamp: "09-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "10-08-2020"
          },
          {
            count: 4,
            company: "Uniqlo",
            timestamp: "11-08-2020"
          },
          {
            count: 7,
            company: "Uniqlo",
            timestamp: "12-08-2020"
          },
          {
            count: 5,
            company: "Uniqlo",
            timestamp: "13-08-2020"
          },
          {
            count: 2,
            company: "Uniqlo",
            timestamp: "14-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "15-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "16-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "17-08-2020"
          },
          {
            count: 7,
            company: "Uniqlo",
            timestamp: "18-08-2020"
          },
          {
            count: 46,
            company: "Uniqlo",
            timestamp: "19-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "20-08-2020"
          },
          {
            count: 2,
            company: "Uniqlo",
            timestamp: "21-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "22-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "23-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "24-08-2020"
          },
        ],
        assortmentMix: [
          {
            data: [20, 5, 5],
            label: "Accessories",
            color: "#009689",
          },
          {
            data: [5, 5, 20],
            label: "Dresses",
            color: "#225450",
          },
          {
            data: [2, 5, 5],
            label: "Blouses&Shirts",
            color: "#d8b75c",
          },
          {
            data: [2, 20, 5],
            label: "Trousers",
            color: "#D67049",
          },
          {
            data: [11, 5, 5],
            label: "Jeans",
            color: "#D8B75D",
          },
          {
            data: [5, 5, 5],
            label: "Knitwear",
            color: "#AC365C",
          },
          {
            data: [5, 5, 5],
            label: "Outerwear",
            color: "#5E152C",
          },
          {
            data: [5, 5, 5],
            label: "Shoes",
            color: "#2F6936",
          },
          {
            data: [5, 5, 5],
            label: "Shorts",
            color: "#61A74A",
          },
          {
            data: [5, 5, 5],
            label: "Skirts",
            color: "#2995AB",
          },
          {
            data: [5, 5, 5],
            label: "Sweatshirts",
            color: "#009689",
          },
          {
            data: [5, 5, 5],
            label: "T-shirts",
            color: "#225450",
          },
          {
            data: [5, 5, 5],
            label: "Underwear",
            color: "#8A3A24",
          },
          {
            data: [5, 5, 5],
            label: "Swimwear",
            color: "#D67049",
          },
          {
            data: [5, 5, 5],
            label: "Others",
            color: "#D8B75D",
          },
        ],
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
        }
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
        newIns: [
          {
            count: 0,
            company: "Zara",
            timestamp: "25-07-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "26-07-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "27-07-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "28-07-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "29-07-2020"
          },
          {
            count: 2,
            company: "Zara",
            timestamp: "30-07-2020"
          },
          {
            count: 8,
            company: "Zara",
            timestamp: "31-07-2020"
          },
          {
            count: 10,
            company: "Zara",
            timestamp: "01-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "02-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "03-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "04-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "05-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "06-08-2020"
          },
          {
            count: 6,
            company: "Zara",
            timestamp: "07-08-2020"
          },
          {
            count: 10,
            company: "Zara",
            timestamp: "08-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "09-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "10-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "11-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "12-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "13-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "14-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "15-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "16-08-2020"
          },
          {
            count: 13,
            company: "Zara",
            timestamp: "17-08-2020"
          },
          {
            count: 15,
            company: "Zara",
            timestamp: "18-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "19-08-2020"
          },
          {
            count: 13,
            company: "Zara",
            timestamp: "20-08-2020"
          },
          {
            count: 3,
            company: "Zara",
            timestamp: "21-08-2020"
          },
          {
            count: 1,
            company: "Zara",
            timestamp: "22-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "23-08-2020"
          },
          {
            count: 0,
            company: "Zara",
            timestamp: "24-08-2020"
          },
          {
            count: 22,
            company: "HM",
            timestamp: "25-07-2020"
          },
          {
            count: 41,
            company: "HM",
            timestamp: "26-07-2020"
          },
          {
            count: 7,
            company: "HM",
            timestamp: "27-07-2020"
          },
          {
            count: 58,
            company: "HM",
            timestamp: "28-07-2020"
          },
          {
            count: 38,
            company: "HM",
            timestamp: "29-07-2020"
          },
          {
            count: 44,
            company: "HM",
            timestamp: "30-07-2020"
          },
          {
            count: 105,
            company: "HM",
            timestamp: "31-07-2020"
          },
          {
            count: 38,
            company: "HM",
            timestamp: "01-08-2020"
          },
          {
            count: 74,
            company: "HM",
            timestamp: "02-08-2020"
          },
          {
            count: 2,
            company: "HM",
            timestamp: "03-08-2020"
          },
          {
            count: 4,
            company: "HM",
            timestamp: "04-08-2020"
          },
          {
            count: 145,
            company: "HM",
            timestamp: "05-08-2020"
          },
          {
            count: 116,
            company: "HM",
            timestamp: "06-08-2020"
          },
          {
            count: 61,
            company: "HM",
            timestamp: "07-08-2020"
          },
          {
            count: 58,
            company: "HM",
            timestamp: "08-08-2020"
          },
          {
            count: 9,
            company: "HM",
            timestamp: "09-08-2020"
          },
          {
            count: 35,
            company: "HM",
            timestamp: "10-08-2020"
          },
          {
            count: 69,
            company: "HM",
            timestamp: "11-08-2020"
          },
          {
            count: 106,
            company: "HM",
            timestamp: "12-08-2020"
          },
          {
            count: 122,
            company: "HM",
            timestamp: "13-08-2020"
          },
          {
            count: 95,
            company: "HM",
            timestamp: "14-08-2020"
          },
          {
            count: 12,
            company: "HM",
            timestamp: "15-08-2020"
          },
          {
            count: 6,
            company: "HM",
            timestamp: "16-08-2020"
          },
          {
            count: 24,
            company: "HM",
            timestamp: "17-08-2020"
          },
          {
            count: 1,
            company: "HM",
            timestamp: "18-08-2020"
          },
          {
            count: 122,
            company: "HM",
            timestamp: "19-08-2020"
          },
          {
            count: 20,
            company: "HM",
            timestamp: "20-08-2020"
          },
          {
            count: 65,
            company: "HM",
            timestamp: "21-08-2020"
          },
          {
            count: 15,
            company: "HM",
            timestamp: "22-08-2020"
          },
          {
            count: 0,
            company: "HM",
            timestamp: "23-08-2020"
          },
          {
            count: 0,
            company: "HM",
            timestamp: "24-08-2020"
          },
          {
            count: 3,
            company: "Uniqlo",
            timestamp: "25-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "26-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "27-07-2020"
          },
          {
            count: 36,
            company: "Uniqlo",
            timestamp: "28-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "29-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "30-07-2020"
          },
          {
            count: 6,
            company: "Uniqlo",
            timestamp: "31-07-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "01-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "02-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "03-08-2020"
          },
          {
            count: 188,
            company: "Uniqlo",
            timestamp: "04-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "05-08-2020"
          },
          {
            count: 9,
            company: "Uniqlo",
            timestamp: "06-08-2020"
          },
          {
            count: 28,
            company: "Uniqlo",
            timestamp: "07-08-2020"
          },
          {
            count: 3,
            company: "Uniqlo",
            timestamp: "08-08-2020"
          },
          {
            count: 3,
            company: "Uniqlo",
            timestamp: "09-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "10-08-2020"
          },
          {
            count: 4,
            company: "Uniqlo",
            timestamp: "11-08-2020"
          },
          {
            count: 7,
            company: "Uniqlo",
            timestamp: "12-08-2020"
          },
          {
            count: 5,
            company: "Uniqlo",
            timestamp: "13-08-2020"
          },
          {
            count: 2,
            company: "Uniqlo",
            timestamp: "14-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "15-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "16-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "17-08-2020"
          },
          {
            count: 7,
            company: "Uniqlo",
            timestamp: "18-08-2020"
          },
          {
            count: 46,
            company: "Uniqlo",
            timestamp: "19-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "20-08-2020"
          },
          {
            count: 2,
            company: "Uniqlo",
            timestamp: "21-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "22-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "23-08-2020"
          },
          {
            count: 0,
            company: "Uniqlo",
            timestamp: "24-08-2020"
          },
        ],
        assortmentMix: [
          {
            data: [20, 5, 5],
            label: "Accessories",
            color: "#009689",
          },
          {
            data: [5, 5, 20],
            label: "Dresses",
            color: "#225450",
          },
          {
            data: [2, 5, 5],
            label: "Blouses&Shirts",
            color: "#d8b75c",
          },
          {
            data: [2, 20, 5],
            label: "Trousers",
            color: "#D67049",
          },
          {
            data: [11, 5, 5],
            label: "Jeans",
            color: "#D8B75D",
          },
          {
            data: [5, 5, 5],
            label: "Knitwear",
            color: "#AC365C",
          },
          {
            data: [5, 5, 5],
            label: "Outerwear",
            color: "#5E152C",
          },
          {
            data: [5, 5, 5],
            label: "Shoes",
            color: "#2F6936",
          },
          {
            data: [5, 5, 5],
            label: "Shorts",
            color: "#61A74A",
          },
          {
            data: [5, 5, 5],
            label: "Skirts",
            color: "#2995AB",
          },
          {
            data: [5, 5, 5],
            label: "Sweatshirts",
            color: "#009689",
          },
          {
            data: [5, 5, 5],
            label: "T-shirts",
            color: "#225450",
          },
          {
            data: [5, 5, 5],
            label: "Underwear",
            color: "#8A3A24",
          },
          {
            data: [5, 5, 5],
            label: "Swimwear",
            color: "#D67049",
          },
          {
            data: [5, 5, 5],
            label: "Others",
            color: "#D8B75D",
          },
        ],
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
        }
      }
    },
  };
  public timeFrames: SelectItem[] = [
    {
      value: "Last week",
      disabled: false
    },
    {
      value: "Last month",
      disabled: false
    }, {
      value: "Custom period",
      disabled: true
    }
  ];
  public chartsPlugins = [pluginDataLabels];
  public assortmentMixChart = {
    options: {
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
    data: null,
    labels: null,
  };
  public newInsChart: any = {
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
    data: null,
    labels: null,
  };
  public filtersForm: FormGroup;
  public highestAvgDiscount: StatisticData = null;
  public highestMfp: StatisticData = null;
  public priceStructure: PriceStructure = null;
  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
  }

  public get selectedCategory(): string {
    const categories = this.filtersForm.controls.categories.value;
    return categories ? categories.value : null;
  }

  public get selectedBrands(): SelectItem[] {
    return this.filtersForm.controls.brands.value;
  }

  public ngOnInit(): void {
    this.filtersForm = this.buildForm();
    if (this.selectedBrands && this.selectedBrands.length && this.selectedCategory) {
      this.initNewInsChart();
      this.initAssortmentMixChart();
    }
    this.onChangeForm();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
    this.unsubscribe$.complete();
  }

  private getMaxValueStatistic(statisticData: StatisticData[]): StatisticData {
    const selectedBrands = this.selectedBrands.map(item => item.value);
    const selectedStatisticData: StatisticData[] = statisticData.filter((item: StatisticData) => selectedBrands.indexOf(item.brand) !== -1);
    return selectedStatisticData.reduce((prev, current) => (prev.value > current.value) ? prev : current, {brand: null, value: null});
  }

  private onChangeForm(): void {
    this.filtersForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(formGroup => {
      if (this.selectedBrands && this.selectedBrands.length && this.selectedCategory) {
        this.priceStructure = this.RESPONSE_DATA.availableCategories[this.selectedCategory].priceStructure;
        const priceRangeColumn = this.RESPONSE_DATA.availableCategories[this.selectedCategory].priceStructure.displayedColumns[0];
        const brands = formGroup.brands.map(item => item.value);
        this.RESPONSE_DATA.availableCategories[this.selectedCategory].priceStructure.displayedColumns = [priceRangeColumn, ...brands];
        const statistic = this.RESPONSE_DATA.availableCategories[this.selectedCategory].statistic;
        this.highestMfp = this.getMaxValueStatistic(statistic.highestMfp.data);
        this.highestAvgDiscount = this.getMaxValueStatistic(statistic.avgDiscount.data);
        this.assortmentMixChart.labels = formGroup.brands.map(item => item.value);
        this.initNewInsChart();
        this.initAssortmentMixChart();
      }
    });
  }

  private initNewInsChart(): void {
    this.newInsChart.data = [];
    this.newInsChart.labels = [];
    const newInsData = this.RESPONSE_DATA.availableCategories[this.selectedCategory].newIns;
    this.selectedBrands.forEach(selectedBrand => {
      const dataSet: any = {};
      const data = [];

      newInsData.forEach(newIns => {
        if (selectedBrand.value === newIns.company) {
          data.push(newIns.count);
          this.newInsChart.labels.push(newIns.timestamp);
        }
      });
      dataSet.data = data;
      dataSet.label = selectedBrand.value;
      dataSet.backgroundColor = dataSet.hoverBackgroundColor = dataSet.hoverBorderColor = dataSet.borderColor
        = this.RESPONSE_DATA.brandColors[selectedBrand.value];
      this.newInsChart.data.push(dataSet);
    });
    this.newInsChart.labels = this.newInsChart.labels.filter(this.onlyUnique);
  }

  private onlyUnique(value, index, self): boolean {
    return self.indexOf(value) === index;
  }

  private initAssortmentMixChart(): void {
    this.assortmentMixChart.data = this.RESPONSE_DATA.availableCategories[this.selectedCategory].assortmentMix.map(item => ({
      data: item.data,
      label: item.label,
      backgroundColor: item.color,
      hoverBackgroundColor: item.color,
      hoverBorderColor: item.color,
      borderColor: item.color
    }));
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      brands: null,
      categories: null,
      timeFrame: null,
    });
  }
}
