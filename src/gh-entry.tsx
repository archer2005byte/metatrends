// Client-only entry used for the static GitHub Pages build.
// The Lovable/TanStack Start build does not use this file.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { MetaTrendsPresentation } from "./routes/index";
import { ResourcesPage } from "./routes/resources";
import "./styles.css";

const rootEl = document.getElementById("root");
if (rootEl) {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const relativePath = window.location.pathname.slice(basePath.length).replace(/\/$/, "") || "/";
  const Page = relativePath === "/resources" ? ResourcesPage : MetaTrendsPresentation;

  createRoot(rootEl).render(
    <StrictMode>
      <Page />
    </StrictMode>,
  );
}
