export interface DashboardData {
  brands: SelectItem[];
  brandColors: { [key: string]: string };
  categories: SelectItem[];
  lastWeek: AvailableCategoriesData;
  lastMonth: AvailableCategoriesData;
}

export interface AvailableCategoriesData {
  [key: string]: {
    assortmentMix: AssortmentMix;
    priceStructure: PriceStructure;
    newIns: NewIns;
    statistic: {
      avgDiscount: Statistic;
      highestMfp: Statistic;
      newIns: NewInsStatistic;
    };
  };
}

export interface NewInsStatistic {
  currentPeriod: Statistic;
  previousPeriod: Statistic;
}

export interface Statistic {
  data: StatisticData[];
  measurement: string;
}

export interface StatisticData {
  brand: string;
  value: number;
}

export interface CalculatedStatisticData extends StatisticData {
  measurement: string;
}

export interface CalculatedNewInsStatistic {
  sum: number;
  profit: string;
}

export interface SelectItem {
  id?: string;
  value: string;
  locked?: boolean;
}

export interface PriceStructure {
  data: PriceStructureData[];
  displayedColumns: string[];
  measurement: string;
}

interface PriceStructureData {
  [key: string]: string | number;
}

interface NewIns {
  values: { [key: string]: number[] };
  timestamps: string[];
}

export interface AssortmentMix {
  categoriesLabels: string[];
  values: { [key: string]: number[] };
  colors: string[];
}
