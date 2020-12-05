import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import config from "config/sentry.config.json";
import appConfig from "config/app.config.js";

export function initSentry() {
  Sentry.init({
    dsn: config.dsn,
    environment: appConfig.environment,
    release: "corkheads@" + appConfig.version,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}
