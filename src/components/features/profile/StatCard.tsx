export function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl text-center">
      <span className="text-foreground text-lg leading-none font-semibold">
        {value.toLocaleString()}
      </span>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );
}
