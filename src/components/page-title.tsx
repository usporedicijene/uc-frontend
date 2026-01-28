export function PageTitle({
  className = "",
  subtitle,
  title,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {subtitle ? (
        <div className="text-muted-foreground mt-1 text-sm">{subtitle}</div>
      ) : null}
    </div>
  );
}
