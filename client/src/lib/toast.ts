// Minimal pub-sub so any component can trigger a toast without prop-drilling
// or context. One <Toast /> is mounted once in App.tsx and listens.
type Listener = (message: string) => void;
const listeners = new Set<Listener>();

export function showToast(message: string) {
  listeners.forEach((l) => l(message));
}

export function subscribeToast(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
