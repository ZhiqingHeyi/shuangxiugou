import type { BrandItem } from './types';
import brandsData from './data/brands.json';

const raw = brandsData as {
  version: string;
  updated_at: string;
  license: string;
  disclaimer: string;
  brands: BrandItem[];
  categories: string[];
};

export const DATA_VERSION = raw.version;
export const DATA_UPDATED_AT = raw.updated_at;
export const DATA_LICENSE = raw.license;
export const DATA_DISCLAIMER = raw.disclaimer;

export const INITIAL_BRANDS: BrandItem[] = raw.brands;

export const CATEGORIES: string[] = raw.categories;
