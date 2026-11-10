# Google Sheets setup (RSVP + Wishes)

Spreadsheet: https://docs.google.com/spreadsheets/d/1EYiobM9oXaz-upkrYzGO28948Oc9ej8wjRMT4o0LWqQ/edit

1. Open the spreadsheet → **Extensions → Apps Script**.
2. Replace everything in `Code.gs` with the contents of `code.gs` in this folder (same as `/code.ts` without the first line). Save.
3. In the toolbar choose the function **`setup`** and click **Run**. Approve the permissions.
   This creates the `RSVP` and `Wishes` sheets with headers.
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web app URL (ends with `/exec`) and paste it into `src/wedding.ts` → `SCRIPT_URL`.
6. Commit, push, and Vercel redeploys.

After editing the script later: **Deploy → Manage deployments → Edit → Version: New version** (the URL stays the same).

| Sheet  | Columns |
| ------ | ------- |
| RSVP   | Timestamp, Full Name, Guests, Attendance, Dietary Notes, Invited As |
| Wishes | Timestamp, Guest Name, Message, Invited As |

"Invited As" is the guest name from the personalized link (e.g. `Mr. Sanjaya`), blank when opened without one.
