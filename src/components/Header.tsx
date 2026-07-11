import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-280 items-center justify-between px-6 py-3 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="Campus Pantry home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.avif"
            alt="Campus Pantry"
            width={1200}
            height={400}
            className="h-9 w-auto"
          />
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="flex items-center gap-4 text-sm font-medium md:gap-6">
            <Link href="/" className="hover:text-brand-red">
              Home
            </Link>
            <Link href="/onboarding" className="hover:text-brand-red">
              Onboarding
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
