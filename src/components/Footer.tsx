const BUILD_DATE = new Date().toISOString().split("T")[0];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-6 text-sm text-muted">
      <div className="mx-auto flex max-w-280 flex-col gap-2 px-6 md:flex-row md:justify-between md:px-8">
        <span>© {new Date().getFullYear()} Campus Pantry</span>
        <span>Last updated: {BUILD_DATE}</span>
      </div>
    </footer>
  );
}
