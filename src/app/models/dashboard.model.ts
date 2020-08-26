export interface DashboardData {
  brands: SelectItem[];
  brandColors: { [key: string]: string };
  categories: SelectItem[];
  assortmentMix: AssortmentMix;
  availableCategories: {
    [key: string]: {
      priceStructure: PriceStructure;
      newIns: NewIns;
      statistic?: {
        avgDiscount: Statistic;
        highestMfp: Statistic;
      };
    }
  };
}

export interface Statistic {
  data: StatisticData[];
  measurement: string;
}

export interface StatisticData {
  brand: string;
  value: number;
}

export interface SelectItem {
  id?: string;
  value: string;
  disabled: boolean;
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
  values: {[key: string]: number[]};
  timestamps: string[];
}

interface AssortmentMix {
  categoriesLabels: string[];
  values: {[key: string]: number[]};
  colors: string[];
}

interface AssortmentMix2 {
  value: number;
  brand: string;
  category: string;
}
