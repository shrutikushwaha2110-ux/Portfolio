import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;
let initialized = false;

export function isAiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

function getClient(): Anthropic | null {
  if (!isAiConfigured()) return null;
  if (!initialized) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    initialized = true;
  }
  return client;
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
const MAX_OUTPUT_TOKENS = 700;

export async function askClaude(
  systemPrompt: string,
  history: ChatTurn[]
): Promise<string> {
  const anthropic = getClient();
  if (!anthropic) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;

  const response = await anthropic.messages.create({
    model,
    max_tokens: MAX_OUTPUT_TOKENS,
    system: systemPrompt,
    messages: history.map((turn) => ({ role: turn.role, content: turn.content })),
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from model");
  }
  return textBlock.text;
}
