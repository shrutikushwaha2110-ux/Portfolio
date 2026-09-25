import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app.js";
import { isAiConfigured } from "./services/claudeClient.js";

const PORT = Number(process.env.PORT) || 5174;

const app = createApp();

app.listen(PORT, () => {
  console.log(`Portfolio API listening on port ${PORT}`);
  console.log(
    isAiConfigured()
      ? "Anthropic AI chat: enabled"
      : "Anthropic AI chat: DISABLED (no ANTHROPIC_API_KEY) — chatbot will use keyword fallback mode"
  );
});
