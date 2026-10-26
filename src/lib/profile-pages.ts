import type { Locale } from '@/i18n/routing';
import en from '../../messages/en.json';
import th from '../../messages/th.json';
import lo from '../../messages/lo.json';
import zh from '../../messages/zh-CN.json';
import vi from '../../messages/vi.json';
export type ProfileStat = {
  value: string;
  label: string;
};

export type ProfileCard = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ProfileRow = {
  label: string;
  title: string;
  description: string;
};

export type ProfileCaseStudy = {
  sector: string;
  title: string;
  description: string;
  outcome: string;
};

export type ProfilePageSlug =
  | "company"
  | "capabilities"
  | "technology"
  | "case-studies"
  | "contact";

export type ProfilePageContent = {
  slug: ProfilePageSlug;
  kicker: string;
  title: string;
  description: string;
  stats: ProfileStat[];
  cardsTitle: string;
  cards: ProfileCard[];
  rowsKicker: string;
  rowsTitle: string;
  rows: ProfileRow[];
  proofKicker: string;
  proofTitle: string;
  proof: ProfileCaseStudy[];
  ctaKicker: string;
  ctaTitle: string;
  ctaBody: string;
  ctaHref: string;
  ctaLabel: string;
};



const catalogs = {en, th, lo, 'zh-CN': zh, vi};
export function getProfilePageContent(locale: Locale, slug: ProfilePageSlug): ProfilePageContent {
 return catalogs[locale].Profiles[slug] as ProfilePageContent;
}
