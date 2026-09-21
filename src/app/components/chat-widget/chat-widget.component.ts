import { Component, ElementRef, ViewChild, effect, signal } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { TelegramService } from '../../services/telegram.service';

interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
  contactCard?: boolean;
}

interface FaqEntry {
  keywords: string[];
  answer: string;
  contactCard?: boolean;
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.scss',
})
export class ChatWidgetComponent {
  @ViewChild('chatInput') chatInput?: ElementRef<HTMLInputElement>;
  @ViewChild('scrollAnchor') scrollAnchor?: ElementRef<HTMLDivElement>;

  // Shared contact details — reused by the "Direct Chat Coordinates" card
  // and, elsewhere in the app, by the Quick Contact widget.
  readonly telegramHandle = '@neou_sopanha';
  readonly telegramUrl = 'https://t.me/nha_nhazzz';
  readonly phoneDisplay = '(+855) 81 714 434';
  readonly phoneHref = 'tel:+85581714434';
  readonly email = 'novsopanha785@gmail.com';

  draft = signal('');
  sending = signal(false);

  readonly quickPrompts = [
    { icon: '⚡', label: "What is Sopanha's primary tech stack?" },
    { icon: '🎓', label: 'Tell me about his SETEC background' },
    { icon: '💬', label: 'How do I get in touch directly?' },
  ];

  private readonly faq: FaqEntry[] = [
    {
      keywords: ['stack', 'tech', 'technology', 'language', 'framework'],
      answer:
        "Sopanha's core stack includes **Angular + TypeScript** on the frontend, with **Java** for backend development and **MySQL, Oracle, and MongoDB** for database management. Check the Skills section for the full breakdown.",
    },
    {
      keywords: ['setec', 'university', 'background', 'school', 'education', 'degree', 'study'],
      answer:
        "He's an **Management Information System (MIS)** student at the **SETEC INSTITUTE**, class of 2024-2028, See the About and Experience sections for details.",
    },
    {
      keywords: ['project', 'work', 'build', 'portfolio', 'app'],
      answer:
        "He's shipped a mix of client and personal projects — payment gateways, education platforms, Telegram mini apps, and more. Scroll to the **Projects** section to see live demos and source links where available.",
    },
    {
      keywords: ['certificate', 'certification', 'credential', 'honor'],
      answer:
        'His verified certifications and academic transcripts from **SETEC** are listed under **Certifications & Honors** on the Experience page.',
    },
    {
      keywords: ['contact', 'email', 'phone', 'hire', 'available', 'reach', 'telegram', 'call'],
      answer:
        "**Neou Sopanha** is a Full-Stack Web Developer in Phnom Penh specializing in Angular, TypeScript, and cloud REST APIs.\n\nHe is currently open for **Internships, Junior Engineering roles, and Freelance projects.**\n\nWould you like to chat with him directly on Telegram?",
      contactCard: true,
    },
  ];

  // Fallback for anything that doesn't hit a keyword above — same rich
  // profile + contact card, since that's the most useful default reply.
  private readonly fallback: FaqEntry = this.faq[this.faq.length - 1];

  messages = signal<ChatMessage[]>([
    {
      from: 'bot',
      text:
        "👋 Hi! I'm Sopanha's AI Portfolio Assistant. I can answer questions about his tech stack, SETEC INSTITUTE (MIS) background, featured builds, and certificates — or pass a message straight to him.",
    },
  ]);

  constructor(public chat: ChatService, private telegram: TelegramService) {
    // Focus the input whenever the panel opens.
    effect(() => {
      if (this.chat.open()) {
        queueMicrotask(() => this.chatInput?.nativeElement.focus());
      }
    });
  }

  sendPrompt(text: string): void {
    this.draft.set(text);
    this.send();
  }

  async send(): Promise<void> {
    const text = this.draft().trim();
    if (!text || this.sending()) return;

    this.messages.update((m) => [...m, { from: 'user', text }]);
    this.draft.set('');
    this.sending.set(true);
    this.scrollToBottom();

    // Forward every message straight to Telegram so it's never missed,
    // regardless of whether the FAQ engine below finds a canned answer.
    void this.telegram.notify({ source: 'AI Chat Widget', message: text });

    const matched = this.faq.find((entry) =>
      entry.keywords.some((k) => text.toLowerCase().includes(k))
    );
    const entry = matched ?? this.fallback;

    // Small delay so it reads like a real reply, not an instant lookup.
    setTimeout(() => {
      this.messages.update((m) => [
        ...m,
        { from: 'bot', text: entry.answer, contactCard: entry.contactCard },
      ]);
      this.sending.set(false);
      this.scrollToBottom();
    }, 500);
  }

  reset(): void {
    this.messages.set([
      {
        from: 'bot',
        text:
          "👋 Hi again! Ask me anything about Sopanha's tech stack, background, or projects — or leave a message and I'll pass it along on Telegram.",
      },
    ]);
    this.draft.set('');
  }

  /** Converts the bot's `**bold**` markdown + blank-line paragraphs into safe HTML. */
  formatBotText(text: string): string {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const bolded = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    return bolded
      .split('\n\n')
      .map((para) => `<p>${para.replace(/\n/g, '<br>')}</p>`)
      .join('');
  }

  private scrollToBottom(): void {
    queueMicrotask(() => {
      this.scrollAnchor?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }
}
