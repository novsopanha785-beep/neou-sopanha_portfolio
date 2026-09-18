import { Injectable } from '@angular/core';

export interface TelegramPayload {
  /** Where the message came from — shown in the Telegram notification. */
  source: 'AI Chat Widget' | 'Contact Form';
  message: string;
  name?: string;
  email?: string;
  subject?: string;
}

@Injectable({ providedIn: 'root' })
export class TelegramService {
  // Handled by the /api/telegram serverless function — see api/telegram.js.
  private readonly endpoint = '/api/telegram';

  async notify(payload: TelegramPayload): Promise<boolean> {
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      // Network/CORS failure, or running somewhere without the API route
      // (e.g. `ng serve` with no backend) — fail silently, caller decides UX.
      return false;
    }
  }
}
