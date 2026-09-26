import { showToast } from "./toast";

// mailto:/tel: links only do something if the visitor's OS has a mail/phone
// app registered as default — on a browser with neither, clicking them looks
// completely broken (nothing visibly happens). This runs alongside the
// normal href navigation (never preventDefault) so a configured app still
// opens, but *something visible always happens* either way: the value also
// lands on the clipboard and a toast confirms it.
export function handleMailtoClick(email: string) {
  navigator.clipboard?.writeText(email).catch(() => {});
  showToast(`Opening your email app... "${email}" is also copied, just in case.`);
}

export function handleTelClick(phone: string) {
  navigator.clipboard?.writeText(phone).catch(() => {});
  showToast(`Opening your phone app... "${phone}" is also copied, just in case.`);
}
