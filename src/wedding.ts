// Single source of truth for this wedding's details and guest personalization.

export const WEDDING = {
  brideName: 'Sewmini',
  groomName: 'Oshada',
  brideFullName: 'D.D.S. Sewmini',
  groomFullName: 'W.K. Oshada',
  brideParents: 'Mr. D.D. Nilaksha Wijekumara & Mrs. T. Iresha Subashini',
  groomParents: 'Mr. W.K. Dayapala & Mrs. H.D. Shyamani',

  date: new Date('2026-12-02T08:00:00'),
  dayLong: 'Wednesday, December 02',
  dateFull: 'Wednesday 02 December 2026',
  dateDots: '02 . 12 . 2026',
  dateFooter: 'December 02, 2026',
  monthYear: 'December 2026',
  yearWords: 'The Year Two Thousand Twenty Six',
  timeRange: '8:00 AM – 3:00 PM',

  venueName: 'Rock House',
  venueArea: 'Galbangalawa, Piliyandala',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Rock+House+Galbangalawa+Piliyandala&t=&z=15&ie=UTF8&iwloc=&output=embed',
  liveLocationUrl: 'https://maps.app.goo.gl/auuPiUhnznxWNrG99?g_st=ic',

  schedule: [
    { time: '09:10 AM', title: 'Registration' },
    { time: '09:48 AM', title: 'Poruwa Ceremony' },
    { time: '12:30 PM', title: 'Buffet Opens' },
    { time: '03:30 PM', title: 'Wedding Ends' },
  ],
} as const;

// ---- Google Sheets backend (see code.ts) ----
// Paste the Apps Script Web app URL (ends with /exec) here after deploying code.ts.
export const SCRIPT_URL = 'PASTE_APPS_SCRIPT_WEB_APP_URL_HERE';

/** Sends a row to the "RSVP" or "Wishes" sheet. */
export async function submitToSheet(
  sheet: 'RSVP' | 'Wishes',
  fields: Record<string, string>,
): Promise<void> {
  if (!SCRIPT_URL.startsWith('https://script.google.com/')) {
    throw new Error('SCRIPT_URL is not configured in src/wedding.ts');
  }
  const body = new URLSearchParams({ sheet, invitedAs: getGuestDisplayName(), ...fields });
  // no-cors: Apps Script doesn't send CORS headers; the request still reaches the sheet.
  await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body });
}

// ---- Guest prefixes ----

export const PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'] as const;
export type Prefix = (typeof PREFIXES)[number];

/**
 * Combines prefix + name into the name shown to the guest.
 * "Dear" is a greeting style, not part of the name, so it is never included here
 * (the greeting itself adds "Dear").
 */
export function buildDisplayName(prefix: Prefix, guestName: string): string {
  const name = guestName.trim().replace(/\s+/g, ' ');
  if (!name) return '';
  switch (prefix) {
    case 'Family':
      return `${name} and Family`;
    case 'Dear':
      return name;
    default:
      return `${prefix} ${name}`;
  }
}

// ---- URL encoding of the display name: {baseURL}/{name} ----
// Spaces become "-" for readable links; literal hyphens are kept as %2D so decoding is lossless.

export function encodeGuestSlug(displayName: string): string {
  return displayName
    .split(' ')
    .map((word) => encodeURIComponent(word).replace(/-/g, '%2D'))
    .join('-');
}

export function decodeGuestSlug(slug: string): string {
  try {
    return slug
      .split('-')
      .map((part) => decodeURIComponent(part))
      .join(' ')
      .trim();
  } catch {
    return '';
  }
}

/** Reads the guest's display name from the current URL (path, or legacy ?prefix=&name=). */
export function getGuestDisplayName(): string {
  const params = new URLSearchParams(window.location.search);
  const legacyName = params.get('name');
  if (legacyName) {
    const legacyPrefix = params.get('prefix');
    return [legacyPrefix, legacyName].filter(Boolean).join(' ').trim();
  }

  const slug = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (!slug || slug.includes('/') || slug.toLowerCase() === 'admin' || slug.includes('.html')) {
    return '';
  }
  return decodeGuestSlug(slug);
}
