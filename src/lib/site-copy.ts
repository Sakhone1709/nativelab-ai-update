import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { getProfilePageContent, type ProfileCaseStudy } from "@/lib/profile-pages";

export type Stat = {
  value: string;
  label: string;
};

export type Feature = {
  title: string;
  description: string;
};

export type Principle = {
  label: string;
  text: string;
};

export type UseCase = {
  title: string;
  description: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "linkedin" | "x" | "github" | "website";
};

export type NavCopy = {
  home: string;
  company: string;
  profile: string;
  capabilities: string;
  technology: string;
  caseStudies: string;
  sectors: string;
  method: string;
  contact: string;
};

export type FooterCopy = {
  company: string;
  contactTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  phoneHref: string;
  addressLabel: string;
  address: string;
  addressHref: string;
  socialTitle: string;
  socials: SocialLink[];
};

export type SharedCopy = {
  nav: NavCopy;
  footer: FooterCopy;
};

export type HomeCopy = SharedCopy & {
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    panelLabel: string;
    panelStatus: string;
  };
  stats: Stat[];
  about: {
    kicker: string;
    title: string;
    body: string;
  };
  features: {
    kicker: string;
    title: string;
    items: Feature[];
  };
  why: {
    kicker: string;
    title: string;
    body: string;
    items: Principle[];
  };
  selectedWork: {
    kicker: string;
    title: string;
    ctaLabel: string;
    items: ProfileCaseStudy[];
  };
  useCases: {
    kicker: string;
    title: string;
    items: UseCase[];
  };
  process: {
    kicker: string;
    title: string;
    body: string;
    items: ProcessStep[];
  };
};

export async function getSharedCopy(locale: Locale): Promise<SharedCopy> {
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    nav: {
      home: t("nav.home"),
      company: t("nav.company"),
      profile: t("nav.profile"),
      capabilities: t("nav.capabilities"),
      technology: t("nav.technology"),
      caseStudies: t("nav.caseStudies"),
      sectors: t("nav.sectors"),
      method: t("nav.method"),
      contact: t("nav.contact"),
    },
    footer: {
      company: t("footer.company"),
      contactTitle: t("footer.contactTitle"),
      emailLabel: t("footer.emailLabel"),
      email: t("footer.email"),
      phoneLabel: t("footer.phoneLabel"),
      phone: t("footer.phone"),
      phoneHref: t("footer.phoneHref"),
      addressLabel: t("footer.addressLabel"),
      address: t("footer.address"),
      addressHref: t("footer.addressHref"),
      socialTitle: t("footer.socialTitle"),
      socials: t.raw("footer.socials") as SocialLink[],
    },
  };
}

export async function getHomeCopy(locale: Locale): Promise<HomeCopy> {
  const t = await getTranslations({ locale, namespace: "Home" });
  const shared = await getSharedCopy(locale);
  const caseStudies = getProfilePageContent(locale, "case-studies");

  return {
    ...shared,
    hero: {
      kicker: t("hero.kicker"),
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
      primaryCta: t("hero.primaryCta"),
      secondaryCta: t("hero.secondaryCta"),
      panelLabel: t("hero.panelLabel"),
      panelStatus: t("hero.panelStatus"),
    },
    stats: t.raw("stats") as Stat[],
    about: {
      kicker: t("about.kicker"),
      title: t("about.title"),
      body: t("about.body"),
    },
    features: {
      kicker: t("features.kicker"),
      title: t("features.title"),
      items: t.raw("features.items") as Feature[],
    },
    why: {
      kicker: t("why.kicker"),
      title: t("why.title"),
      body: t("why.body"),
      items: t.raw("why.items") as Principle[],
    },
    selectedWork: {
      kicker: caseStudies.kicker,
      title: caseStudies.proofTitle,
      ctaLabel: shared.nav.caseStudies,
      items: caseStudies.proof,
    },
    useCases: {
      kicker: t("useCases.kicker"),
      title: t("useCases.title"),
      items: t.raw("useCases.items") as UseCase[],
    },
    process: {
      body: t("process.body"),
      kicker: t("process.kicker"),
      title: t("process.title"),
      items: t.raw("process.items") as ProcessStep[],
    },
  };
}
