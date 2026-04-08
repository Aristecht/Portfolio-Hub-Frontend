"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => {
          const url = reg.active?.scriptURL || reg.installing?.scriptURL || "";
          // Unregister any SW that is NOT our current clean push handler
          // This removes old Firebase compat SWs, /sw.js, and any other stale registrations
          if (!url.includes("/api/firebase-messaging-sw.js")) {
            reg.unregister();
          }
        });
      });
    }
  }, []);

  return null;
}
