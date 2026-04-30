import { Localization, LocalizationLocale, LocalizationSlug } from './types';

const PRODUCT_URL = 'https://us.orthotal.com/products/orthobelt';

export const LOCALIZATIONS: Record<LocalizationSlug, Localization> = {
  'orthogurtel-de': {
    locale: 'de-DE',
    market: 'de',
    slug: 'orthogurtel-de',
    productUrl: PRODUCT_URL,
  },
  'orthobelt-us': {
    locale: 'en-US',
    market: 'us',
    slug: 'orthobelt-us',
    productUrl: PRODUCT_URL,
  },
};

export const DEFAULT_LOCALIZATION = LOCALIZATIONS['orthobelt-us'];

export function getLocalizationBySlug(slug: string): Localization {
  return LOCALIZATIONS[slug as LocalizationSlug] ?? DEFAULT_LOCALIZATION;
}

export function getLocalizationByLocale(locale: string): Localization {
  if (locale === 'de-DE') {
    return LOCALIZATIONS['orthogurtel-de'];
  }

  return DEFAULT_LOCALIZATION;
}

export function isSupportedLocale(locale: string): locale is LocalizationLocale {
  return locale === 'de-DE' || locale === 'en-US';
}
