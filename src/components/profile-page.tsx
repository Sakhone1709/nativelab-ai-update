import { getTranslations } from 'next-intl/server';
import { visualKeys, visualText, type VisualCopy } from '@/lib/visual-copy';
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { CaseWorkflow } from "@/components/case-workflow";
import { CaseIntro } from "@/components/case-intro";
import {
  ArrowRight,
  Blocks,
  CheckCircle2,
  CircuitBoard,
  FileSearch,
  ShieldCheck,
  LockKeyhole,
  Database,
  ChartNoAxesCombined,
  Cloud,
  Clock3,
  Users,
} from "lucide-react";

import { SectionHeader, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { BrandHeading } from "@/components/brand-heading";
import { Link } from "@/i18n/navigation";
import type { ProfilePageContent } from "@/lib/profile-pages";
import type { SharedCopy } from "@/lib/site-copy";

const cardIcons = [CircuitBoard, Blocks, FileSearch, ShieldCheck] as const;

export async function ProfilePage({
  content,
  shared,
}: {
  content: ProfilePageContent;
  shared: SharedCopy;
}) {
  const visual = await getTranslations('Visual');
  const copy = Object.fromEntries(Object.values(visualKeys).map(key=>[key,visual(key)])) as VisualCopy;
  const v = (source: Parameters<typeof visualText>[1]) => visualText(copy,source);
  const isExternalCta = content.ctaHref.startsWith("mailto:");

  return (
    <main className={`page-${content.slug} min-h-screen bg-background text-foreground`}>
      <SiteHeader nav={shared.nav} />

      <section className={`profile-hero hero-${content.slug} relative isolate overflow-hidden border-b border-border pt-16`}>
        {content.slug !== "case-studies" && <HeroAtmosphere kind={content.slug} />}
        {content.slug === "company" && <div className="company-callouts" aria-hidden="true">
          <div className="company-callout company-real"><Database /><div><strong>{v('REAL-WORLD')}</strong><p>{v('Built for production operations.')}</p></div></div>
          <div className="company-callout company-private"><LockKeyhole /><div><strong>{v('Private')}</strong><p>{v('Your data stays inside your environment.')}</p></div></div>
          <div className="company-callout company-scale"><ChartNoAxesCombined /><div><strong>{v('SCALABLE')}</strong><p>{v('From pilot to enterprise deployment.')}</p></div></div>
          <div className="company-callout company-trust"><ShieldCheck /><div><strong>{v('TRUSTED')}</strong><p>{v('Governance and evaluation by design.')}</p></div></div>
        </div>}
        <div className="technical-grid absolute inset-0 -z-10 opacity-50" />
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:px-10 lg:py-28">
          <div>
            <p className="overline text-primary">{content.kicker}</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
              <BrandHeading text={content.title} />
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {content.description}
            </p>
            {isExternalCta ? (
              <a
                className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                href={content.ctaHref}
              >
                {content.ctaLabel}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            ) : (
              <Link
                className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                href={content.ctaHref}
              >
                {content.ctaLabel}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="profile-visual">
          {content.slug === "case-studies" && <CaseIntro labels={[v('Knowledge'),v('Agents'),v('Evaluation'),v('Automation')]}/>}
          <div className="profile-stats grid gap-3">
            {content.stats.map((stat, index) => (
              <div
                className="rounded-md border border-border bg-card p-5"
                key={stat.label}
              >
                {content.slug === "technology" && (() => { const Icon = [Cloud, ShieldCheck, ChartNoAxesCombined][index % 3]; return <Icon className="technology-stat-icon" aria-hidden="true" />; })()}
                {content.slug === "contact" && (() => { const Icon = [Clock3, Users, Blocks][index % 3]; return <Icon className="contact-stat-icon" aria-hidden="true" />; })()}
                <p className="font-mono text-2xl font-semibold text-primary">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <SectionHeader kicker={content.kicker} title={content.cardsTitle} />
          <div className="bento-grid mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {content.cards.map((card, index) => {
              const Icon = cardIcons[index % cardIcons.length];

              return (
                <article
                  className="rounded-md border border-border bg-card p-6"
                  key={card.title}


                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <p className="mt-7 font-mono text-xs font-semibold uppercase text-primary">
                    {card.eyebrow}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold text-foreground">
                    {card.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {card.description}
                  </p>

                </article>
              );
            })}
          </div>
        </div>
      </section>

      {content.slug === "case-studies" && <section className="case-workflow-section border-b border-border bg-background">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          {content.slug === "case-studies" && <CaseWorkflow cards={[
            {title:v('Knowledge'),description:v('Private documents and domain data')},
            {title:v('Agents'),description:v('Multi-agent orchestration with governance')},
            {title:v('Evaluation'),description:v('Test sets and real-world behavior')},
            {title:v('Automation'),description:v('Integrated with enterprise tools and workflows')},
          ]} />}
        </div>
      </section>}

      <section className="border-b border-border bg-muted">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.65fr_1.35fr] lg:px-10 lg:py-28">
          <SectionHeader kicker={content.rowsKicker} title={content.rowsTitle} />
          <div className="overflow-hidden rounded-md border border-border bg-background">
            {content.rows.map((row) => (
              <article
                className="grid gap-5 border-b border-border p-6 last:border-b-0 sm:grid-cols-[7rem_1fr]"
                key={row.title}


              >
                <p className="font-mono text-sm font-semibold text-primary">
                  {row.label}
                </p>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {row.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                    {row.description}
                  </p>

                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <SectionHeader kicker={content.proofKicker} title={content.proofTitle} />
          <div className={`mt-12 grid gap-4 ${content.proof.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
            {content.proof.map((item) => (
              <article
                className="flex min-h-72 flex-col rounded-md border border-border bg-card p-6"
                key={item.title}
              >
                <p className="font-mono text-xs font-semibold uppercase text-primary">
                  {item.sector}
                </p>
                <h2 className="mt-5 text-xl font-semibold text-foreground">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-auto flex items-start gap-3 border-t border-border pt-5">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  />
                  <p className="text-sm font-semibold leading-6 text-foreground">
                    {item.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 rounded-md border border-border bg-background p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="overline text-primary">{content.ctaKicker}</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-foreground">
              {content.ctaTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              {content.ctaBody}
            </p>
          </div>
          {isExternalCta ? (
            <a
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={content.ctaHref}
            >
              {content.ctaLabel}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : (
            <Link
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={content.ctaHref}
            >
              {content.ctaLabel}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          )}
        </div>
      </section>

      <SiteFooter footer={shared.footer} />
    </main>
  );
}
