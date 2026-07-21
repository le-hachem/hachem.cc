  import { Suspense, lazy } from "react";
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { LanguageProvider } from "./app/i18n/LanguageContext.tsx";
  import "./styles/index.css";

  // The admin console is a separate chunk fetched only when /admin is opened,
  // so the public page never pays for it. It has no LanguageProvider around it
  // on purpose: it edits all three languages at once rather than reading in one.
  const AdminApp = lazy(() => import("./admin/AdminApp.tsx"));

  const isAdmin = /^\/admin\/?$/.test(window.location.pathname);

  createRoot(document.getElementById("root")!).render(
    isAdmin ? (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    ) : (
      <LanguageProvider>
        <App />
      </LanguageProvider>
    )
  );
