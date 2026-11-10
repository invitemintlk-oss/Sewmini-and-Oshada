import React, { useState } from 'react';
import { Copy, Link as LinkIcon, MessageCircle, CheckCircle } from 'lucide-react';
import { WEDDING, PREFIXES, Prefix, buildDisplayName, encodeGuestSlug } from './wedding';

function buildMessage(displayName: string, link: string): string {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${WEDDING.groomName} & ${WEDDING.brideName}`;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers / contexts without clipboard API access
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}

export function AdminPage() {
  const [prefix, setPrefix] = useState<Prefix>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState<{ displayName: string; link: string } | null>(null);
  const [toast, setToast] = useState('');

  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault();
    const displayName = buildDisplayName(prefix, guestName);
    if (!displayName) return;
    const link = `${window.location.origin}/${encodeGuestSlug(displayName)}`;
    setGenerated({ displayName, link });
  };

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 2000);
  };

  const handleCopy = async (text: string, successMsg: string) => {
    const ok = await copyText(text);
    showToast(ok ? successMsg : 'Copy failed — please copy manually');
  };

  const message = generated ? buildMessage(generated.displayName, generated.link) : '';
  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-brand-beige focus:ring-2 focus:ring-brand-beige-deep focus:border-transparent outline-none transition-all bg-white font-sans';
  const copyBtnClass =
    'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-brand-beige-deep text-brand-beige-deep font-sans text-xs tracking-[0.15em] uppercase hover:bg-brand-beige/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="min-h-screen bg-brand-ivory py-12 px-4 sm:px-6 font-sans text-stone-800 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_8px_30px_rgba(176,137,104,0.15)] border border-brand-beige/50">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display tracking-wide mb-2 text-stone-800">Link Generator</h2>
            <p className="text-stone-500 text-xs uppercase tracking-[0.2em]">
              {WEDDING.brideName} & {WEDDING.groomName} · Personalized invitations
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label htmlFor="prefix" className="block text-sm font-medium text-stone-700 mb-1">
                Select Prefix
              </label>
              <select
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value as Prefix)}
                className={inputClass}
              >
                {PREFIXES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="guestName" className="block text-sm font-medium text-stone-700 mb-1">
                Guest Name
              </label>
              <input
                type="text"
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={!guestName.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-beige-deep text-white text-sm tracking-[0.2em] uppercase shadow-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LinkIcon className="w-5 h-5" />
              Generate Link
            </button>
          </form>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              disabled={!generated}
              onClick={() => generated && handleCopy(generated.link, 'Link copied!')}
              className={copyBtnClass}
            >
              <Copy className="w-4 h-4" /> Copy Link Only
            </button>
            <button
              type="button"
              disabled={!generated}
              onClick={() => handleCopy(message, 'Message copied!')}
              className={copyBtnClass}
            >
              <MessageCircle className="w-4 h-4" /> Copy Full Message
            </button>
          </div>

          {generated && (
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-brand-ivory rounded-xl border border-brand-beige/50">
                <p className="text-xs uppercase tracking-[0.15em] text-stone-500 mb-1">Greeting</p>
                <p className="font-serif text-lg text-stone-800">Dear {generated.displayName} ❤️</p>
                <p className="text-xs uppercase tracking-[0.15em] text-stone-500 mt-4 mb-1">Generated Link</p>
                <a
                  href={generated.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-beige-deep break-all underline underline-offset-2"
                >
                  {generated.link}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-stone-500 mb-1">Message Preview</p>
                <pre className="whitespace-pre-wrap break-words text-sm font-sans text-stone-700 bg-stone-50 border border-stone-200 rounded-xl p-4 max-h-80 overflow-y-auto">
                  {message}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-stone-800 text-white text-sm px-5 py-3 rounded-full shadow-lg"
        >
          <CheckCircle className="w-4 h-4 text-green-400" />
          {toast}
        </div>
      )}
    </div>
  );
}
