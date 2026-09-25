const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  reply: string;
  mode: "ai" | "fallback";
  degraded?: boolean;
}

export class ChatApiError extends Error {}

export async function sendChatMessage(
  message: string,
  history: ChatTurn[]
): Promise<ChatResponse> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });
  } catch {
    throw new ChatApiError(
      "Couldn't reach the assistant backend. It may be offline — please try again shortly or email Shruti directly."
    );
  }

  if (!res.ok) {
    let errMsg = "Something went wrong. Please try again.";
    try {
      const data = await res.json();
      if (data?.error) errMsg = data.error;
    } catch {
      // ignore parse failure, use default message
    }
    throw new ChatApiError(errMsg);
  }

  return res.json();
}
