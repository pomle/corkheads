import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import config from "config/sentry.config.json";

export function initSentry() {
  Sentry.init({
    dsn: config.dsn,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}
