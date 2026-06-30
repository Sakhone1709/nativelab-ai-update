import {
  GitBranch,
  Globe2,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Link } from "@/i18n/navigation";
import type { FooterCopy, NavCopy, SocialLink } from "@/lib/site-copy";

export function BrandMark({
  className = "h-9 w-9",
  uid = "bm",
}: {
  className?: string;
  uid?: string;
}) {
  const tile = `${uid}-tile`;
  const ink = `${uid}-ink`;
  const glow = `${uid}-glow`;

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={tile}
          x1="8"
          x2="56"
          y1="6"
          y2="58"
        >
          <stop offset="0" stopColor="#075037" />
          <stop offset="1" stopColor="#03231a" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={ink}
          x1="32"
          x2="32"
          y1="16"
          y2="48"
        >
          <stop offset="0" stopColor="#5ff0cd" />
          <stop offset="1" stopColor="#21d3a4" />
        </linearGradient>
        <filter height="180%" id={glow} width="180%" x="-40%" y="-40%">
          <feGaussianBlur result="b" stdDeviation="1.4" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect fill={`url(#${tile})`} height="58" rx="15" width="58" x="3" y="3" />
      <rect
        fill="none"
        height="56.5"
        rx="14.25"
        stroke="#21d3a4"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        width="56.5"
        x="3.75"
        y="3.75"
      />

      <g fill={`url(#${ink})`} filter={`url(#${glow})`}>
        <rect height="30" rx="2" width="8" x="18" y="17" />
        <rect height="30" rx="2" width="8" x="38" y="17" />
        <path d="M18 17 L26 17 L46 47 L38 47 Z" />
      </g>

      {/* signal flowing along the N */}
      <path
        className="logo-flow"
        d="M22 47 L22 17 L42 47 L42 17"
        fill="none"
        filter={`url(#${glow})`}
        pathLength={100}
        stroke="#c4fce9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />

      {/* AI node: steady core + outward ping */}
      <circle className="logo-ping" cx="42" cy="17.5" fill="#5ff0cd" r="7.5" />
      <circle className="logo-core" cx="42" cy="17.5" fill="#7df7d6" r="4.4" />
      <circle cx="42" cy="17.5" fill="#03231a" r="1.6" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-heading font-semibold tracking-tight text-foreground ${className}`}
    >
      NativeLab<span className="text-primary">&nbsp;AI</span>
    </span>
  );
}

function SocialIcon({ icon }: { icon: SocialLink["icon"] }) {
  if (icon === "x") {
    return <X aria-hidden="true" className="h-4 w-4" />;
  }

  if (icon === "github") {
    return <GitBranch aria-hidden="true" className="h-4 w-4" />;
  }

  if (icon === "website") {
    return <Globe2 aria-hidden="true" className="h-4 w-4" />;
  }

  return (
    <span aria-hidden="true" className="font-mono text-xs font-bold leading-none">
      in
    </span>
  );
}

export function SectionHeader({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="overline text-primary">{kicker}</p>
      <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function SiteHeader({ nav }: { nav: NavCopy }) {
  const navLinks = [
    { href: "/company", label: nav.company },
    { href: "/capabilities", label: nav.capabilities },
    { href: "/technology", label: nav.technology },
    { href: "/case-studies", label: nav.caseStudies },
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/80 bg-background/82 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          className="group flex items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          href="/"
        >
          <BrandMark
            className="h-9 w-9 transition-transform duration-200 group-hover:scale-105"
            uid="hdr"
          />
          <Wordmark className="text-[15px]" />
        </Link>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            className="hidden min-h-11 items-center justify-center rounded-md border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:inline-flex"
            href="/contact"
          >
            {nav.contact}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ footer }: { footer: FooterCopy }) {
  return (
    <footer
      className="border-t border-border bg-background px-5 py-12 sm:px-8 lg:px-10"
      id="contact"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.42fr_0.55fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark className="h-9 w-9" uid="ftr" />
            <div>
              <Wordmark className="text-sm" />
              <p className="mt-1 text-sm text-muted-foreground">
                {footer.company}
              </p>
            </div>
          </div>
          <p className="mt-8 font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} NativeLab AI
          </p>
        </div>

        <div>
          <p className="overline text-primary">{footer.contactTitle}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <a
              className="group rounded-md border border-border bg-card p-4 transition-colors hover:border-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={`mailto:${footer.email}`}
            >
              <Mail aria-hidden="true" className="h-5 w-5 text-primary" />
              <p className="mt-4 text-xs font-semibold uppercase text-muted-foreground">
                {footer.emailLabel}
              </p>
              <p className="mt-2 break-words text-sm font-semibold text-foreground group-hover:text-primary">
                {footer.email}
              </p>
            </a>
            <a
              className="group rounded-md border border-border bg-card p-4 transition-colors hover:border-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={footer.phoneHref}
            >
              <Phone aria-hidden="true" className="h-5 w-5 text-primary" />
              <p className="mt-4 text-xs font-semibold uppercase text-muted-foreground">
                {footer.phoneLabel}
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary">
                {footer.phone}
              </p>
            </a>
            <a
              className="group rounded-md border border-border bg-card p-4 transition-colors hover:border-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={footer.addressHref}
              rel="noreferrer"
              target="_blank"
            >
              <MapPin aria-hidden="true" className="h-5 w-5 text-primary" />
              <p className="mt-4 text-xs font-semibold uppercase text-muted-foreground">
                {footer.addressLabel}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-foreground group-hover:text-primary">
                {footer.address}
              </p>
            </a>
          </div>
        </div>

        <div>
          <p className="overline text-primary">{footer.socialTitle}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {footer.socials.map((social) => (
              <a
                aria-label={social.label}
                className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                href={social.href}
                key={social.label}
                rel="noreferrer"
                target="_blank"
                title={social.label}
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
