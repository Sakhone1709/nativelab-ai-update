"use client";

import { motion, type Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  DatabaseZap,
  Layers3,
  LockKeyhole,
  Network,
  ScanSearch,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { AiCore } from "@/components/ai-core";
import { EvalPanel } from "@/components/eval-panel";
import { NeuralFlow } from "@/components/neural-flow";
import { SectionHeader, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Link } from "@/i18n/navigation";
import type { HomeCopy } from "@/lib/site-copy";

type HomeClientProps = {
  t: HomeCopy;
};

const capabilityIcons = [BrainCircuit, Workflow, DatabaseZap, ScanSearch] as const;
const sectorIcons = [Network, LockKeyhole, Layers3] as const;
const principleIcons = [ShieldCheck, Cpu, Activity] as const;

// Animation Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export function HomeClient({ t }: HomeClientProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader nav={t.nav} />

      <section
        className="relative isolate min-h-[92svh] overflow-hidden border-b border-border"
        id="top"
      >
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(125%_125%_at_72%_35%,rgba(4,57,39,0.55),transparent_60%)]" />
        <div className="aurora absolute -z-20 right-[6%] top-[14%] h-[58vh] w-[58vh] rounded-full bg-[radial-gradient(circle,rgba(33,211,164,0.18),transparent_62%)] blur-3xl" />
        <div
          className="aurora absolute -z-20 left-[2%] top-[44%] h-[48vh] w-[48vh] rounded-full bg-[radial-gradient(circle,rgba(4,57,39,0.55),transparent_60%)] blur-3xl"
          style={{ animationDelay: "-9s", animationDuration: "23s" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-1/2 -z-[15] hidden -translate-y-1/2 opacity-[0.16] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] lg:block"
        >
          <AiCore className="h-[760px] w-[760px]" />
        </div>
        <div className="technical-grid absolute inset-0 -z-10 opacity-50" />

        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-full max-w-7xl -translate-x-1/2 px-5 sm:px-8 lg:block lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute right-5 top-1/2 -translate-y-1/2 sm:right-8 lg:right-10"
          >
            <EvalPanel />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[92svh] w-full max-w-7xl flex-col justify-end px-5 pb-8 pt-28 sm:px-8 lg:px-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl pb-12 pt-16 sm:pb-16 lg:pb-20"
          >
            <motion.p variants={fadeUp} className="overline text-primary">{t.hero.kicker}</motion.p>
            <motion.h1 variants={fadeUp} className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
              {t.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-foreground/78 sm:text-xl">
              {t.hero.subtitle}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                href="/capabilities"
              >
                {t.hero.primaryCta}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background/50 px-5 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-primary hover:text-primary hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                href="/company"
              >
                {t.hero.secondaryCta}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="grid border border-border bg-background/72 backdrop-blur-md md:grid-cols-[0.95fr_repeat(3,1fr)]"
          >
            <div className="border-b border-border p-5 md:border-b-0 md:border-r">
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                {t.hero.panelLabel}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                {t.hero.panelStatus}
              </p>
            </div>
            {t.stats.map((stat, i) => (
              <motion.div
                whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                className="border-t border-border p-5 md:border-l md:border-t-0 transition-colors"
                key={stat.label}
              >
                <p className="font-mono text-2xl font-semibold text-primary">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border bg-background" id="profile">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-28"
        >
          <motion.div variants={fadeUp}>
            <SectionHeader kicker={t.about.kicker} title={t.about.title} />
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-md border border-border bg-card">
              <NeuralFlow />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(2,8,6,0.55))]" />
            </div>
          </motion.div>
          <div className="grid gap-8">
            <motion.p variants={fadeUp} className="max-w-3xl text-lg leading-9 text-muted-foreground">
              {t.about.body}
            </motion.p>
            <div className="grid gap-3 sm:grid-cols-3">
              {t.why.items.map((principle, index) => {
                const Icon = principleIcons[index % principleIcons.length];

                return (
                  <motion.article
                    variants={fadeUp}
                    whileHover={{ y: -5, borderColor: "var(--ring)" }}
                    className="rounded-md border border-border bg-card p-5 transition-all"
                    key={principle.label}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                    <h3 className="mt-5 text-base font-semibold text-foreground">
                      {principle.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {principle.text}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      <section
        className="border-b border-border bg-[linear-gradient(180deg,var(--background),var(--muted))]"
        id="capabilities"
      >
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
        >
          <motion.div variants={fadeUp}>
            <SectionHeader
              kicker={t.features.kicker}
              title={t.features.title}
            />
          </motion.div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {t.features.items.map((feature, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];

              return (
                <motion.article
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group flex min-h-72 flex-col rounded-md border border-border bg-card p-6 transition-all hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5"
                  key={feature.title}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-secondary text-primary transition-colors group-hover:border-primary/60 group-hover:bg-primary/10">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                  <div className="mt-auto pt-7">
                    <CheckCircle2
                      aria-hidden="true"
                      className="h-5 w-5 text-primary/80 transition-transform group-hover:scale-110"
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="border-b border-border bg-background" id="sectors">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-10 lg:py-28"
        >
          <motion.div variants={fadeUp}>
            <SectionHeader
              kicker={t.useCases.kicker}
              title={t.useCases.title}
            />
          </motion.div>
          <motion.div variants={fadeUp} className="overflow-hidden rounded-md border border-border bg-card">
            {t.useCases.items.map((useCase, index) => {
              const Icon = sectorIcons[index % sectorIcons.length];

              return (
                <motion.article
                  whileHover={{ backgroundColor: "var(--muted)", x: 4 }}
                  className="grid gap-5 border-b border-border p-6 last:border-b-0 sm:grid-cols-[auto_1fr] transition-all"
                  key={useCase.title}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-primary">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {useCase.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                      {useCase.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      <section className="border-b border-border bg-muted">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              kicker={t.selectedWork.kicker}
              title={t.selectedWork.title}
            />
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-border px-5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href="/case-studies"
            >
              {t.selectedWork.ctaLabel}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </motion.div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {t.selectedWork.items.map((item) => (
              <motion.article
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="rounded-md border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-md"
                key={item.title}
              >
                <p className="font-mono text-xs font-semibold uppercase text-primary">
                  {item.sector}
                </p>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-6 border-t border-border pt-5 text-sm font-semibold leading-6 text-foreground">
                  {item.outcome}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-b border-border bg-background" id="method">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
        >
          <motion.div variants={fadeUp}>
            <SectionHeader kicker={t.process.kicker} title={t.process.title} />
          </motion.div>

          <ol className="mt-12 grid gap-5 lg:grid-cols-4">
            {t.process.items.map((step) => (
              <motion.li
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_44px_-18px_rgba(7,20,15,0.3)]"
                key={step.step}
              >
                <span className="absolute right-5 top-5 font-mono text-5xl font-bold text-primary/10 transition-colors group-hover:text-primary/20">
                  {step.step}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  {step.step}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-card-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </section>

      <section className="border-b border-border bg-background">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:px-10 lg:py-28"
        >
          <motion.div variants={fadeUp}>
            <SectionHeader
              body={t.why.body}
              kicker={t.why.kicker}
              title={t.why.title}
            />
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-md border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <p className="font-mono text-xs font-semibold uppercase text-muted-foreground">
                {t.why.kicker}
              </p>
              <Cpu aria-hidden="true" className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <div className="divide-y divide-border">
              {t.why.items.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="py-5 hover:bg-muted/30 transition-colors -mx-5 px-5" 
                  key={item.label}
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <SiteFooter footer={t.footer} />
    </main>
  );
}
