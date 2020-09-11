export interface DashboardData {
  brands: SelectItem[];
  brandColors: { [key: string]: string };
  categories: SelectItem[];
  lastWeek: AvailableCategories;
  lastMonth: AvailableCategories;
}

export interface AvailableCategories {
  [key: string]: AvailableCategoriesData;
}

export interface AvailableCategoriesData {
  assortmentMix: AssortmentMix;
  priceStructure: PriceStructure;
  newIns: NewIns;
  statistic: {
    avgDiscount: Statistic;
    avgPrice: Statistic;
    newIns: Statistic;
  };
}

export interface Statistic {
  [key: string]: number;
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
  currency: string;
}

interface PriceStructureData {
  [key: string]: string | number;
}

interface NewIns {
  data: { [key: string]: number[] };
  timestamps: string[];
}

export interface AssortmentMix {
  categoriesLabels: string[];
  data: { [key: string]: number[] };
  colors: string[];
}

export interface HiddenCharts {
  img: string;
  title: string;
  subTitle: string;
}
