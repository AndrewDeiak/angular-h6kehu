export interface DashboardData {
  brands: SelectItem[];
  brandColors: { [key: string]: string };
  categories: SelectItem[];
  availableCategories: {
    [key: string]: {
      priceStructure: PriceStructure;
      newIns: NewIns[];
      assortmentMix: AssortmentMix[];
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
  count: number;
  company: string;
  timestamp: string;
}

interface AssortmentMix {
  data: number[];
  label: string;
  color: string;
}
