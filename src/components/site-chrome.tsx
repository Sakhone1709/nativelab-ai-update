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

export function BrandMark() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/35 bg-brand text-sm font-semibold text-foreground">
      N
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
          className="flex items-center gap-3 rounded-md text-sm font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          href="/"
        >
          <BrandMark />
          <span>NativeLab AI</span>
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
            <BrandMark />
            <div>
              <p className="text-sm font-semibold text-foreground">
                NativeLab AI
              </p>
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
