import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat.js";
import { isAiConfigured } from "./services/claudeClient.js";

export function createApp() {
  const app = express();

  const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin(origin, callback) {
        // Allow same-origin/non-browser requests (no Origin header) and configured origins.
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );

  app.use(express.json({ limit: "50kb" }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", aiConfigured: isAiConfigured() });
  });

  app.use("/api/chat", chatRouter);

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  // Central error handler — never leak stack traces or internals.
  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      console.error("[server] Unhandled error:", err);
      if (res.headersSent) return;
      res.status(500).json({ error: "Internal server error." });
    }
  );

  return app;
}
