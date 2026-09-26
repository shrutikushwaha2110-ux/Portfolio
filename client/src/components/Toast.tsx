import { useEffect, useRef, useState } from "react";
import { subscribeToast } from "../lib/toast";
import "./Toast.css";

export default function Toast() {
  const [message, setMessage] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return subscribeToast((msg) => {
      setMessage(msg);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setMessage(null), 3200);
    });
  }, []);

  return (
    <div className="toast-host" role="status" aria-live="polite">
      {message && <div className="toast">{message}</div>}
    </div>
  );
}
