export function storageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = process.env.NEXT_PUBLIC_S3_URL;
  if (!base) return null;
  return `${base}/${path.replace(/^\//, "")}`;
}
