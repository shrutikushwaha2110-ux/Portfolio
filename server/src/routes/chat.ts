import { Router, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import { askClaude, isAiConfigured, type ChatTurn } from "../services/claudeClient.js";
import { buildSystemPrompt } from "../services/systemPrompt.js";
import { getFallbackReply } from "../services/fallbackResponder.js";

const router = Router();

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_TURNS = 20;

const chatRateLimiter = rateLimit({
  windowMs: 60_000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages. Please wait a moment and try again." },
});

function isValidTurn(turn: unknown): turn is ChatTurn {
  if (!turn || typeof turn !== "object") return false;
  const t = turn as Record<string, unknown>;
  return (
    (t.role === "user" || t.role === "assistant") &&
    typeof t.content === "string" &&
    t.content.trim().length > 0 &&
    t.content.length <= MAX_MESSAGE_LENGTH
  );
}

router.post("/", chatRateLimiter, async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body ?? {};

    if (typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "A non-empty 'message' string is required." });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Message too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.`,
      });
    }

    let priorTurns: ChatTurn[] = [];
    if (history !== undefined) {
      if (!Array.isArray(history) || !history.every(isValidTurn)) {
        return res.status(400).json({ error: "Invalid conversation history." });
      }
      priorTurns = history.slice(-MAX_HISTORY_TURNS);
    }

    if (!isAiConfigured()) {
      const reply = getFallbackReply(message);
      return res.json({ reply, mode: "fallback" });
    }

    const systemPrompt = buildSystemPrompt();
    const turns: ChatTurn[] = [...priorTurns, { role: "user", content: message.trim() }];

    try {
      const reply = await askClaude(systemPrompt, turns);
      return res.json({ reply, mode: "ai" });
    } catch (aiError) {
      console.error("[chat] Anthropic API error:", aiError);
      const reply = getFallbackReply(message);
      return res.json({ reply, mode: "fallback", degraded: true });
    }
  } catch (err) {
    console.error("[chat] Unexpected error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
