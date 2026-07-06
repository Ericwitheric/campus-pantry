import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-280 items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span aria-hidden className="text-brand-red">
            🥕
          </span>
          Campus Pantry
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-brand-red">
            Home
          </Link>
          <Link href="/onboarding" className="hover:text-brand-red">
            Onboarding
          </Link>
        </nav>
      </div>
    </header>
  );
}
