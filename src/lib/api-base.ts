// The static GitHub Pages build has no server runtime, so API calls are sent
// to the Lovable-hosted deployment of this same app.
const LOVABLE_APP_URL =
  "https://project--0c3b4a5b-be31-4cd6-92e3-e774d6c3e6ab.lovable.app";

export function apiUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (typeof window === "undefined") return clean;
  const host = window.location.hostname;
  const isLovableOrLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".lovable.app") ||
    host.endsWith(".lovableproject.com");
  return isLovableOrLocal ? clean : `${LOVABLE_APP_URL}${clean}`;
}
