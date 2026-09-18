import { CommonModule } from '@angular/common';
import { Component, HostListener, computed, signal } from '@angular/core';

type ProjectCategory = 'Full Stack' | 'Frontend' | 'Mobile' | 'AI & UI/UX';
type ProjectStatus = 'Live' | 'In Progress' | 'Archived';

interface Project {
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  keyFeatures: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  /** Fake address shown in the browser-style card header, e.g. "campay.finance.kh" */
  domain: string;
  /** Fallback background shown when no `image` is provided. */
  gradient: string;
  /** Optional real screenshot — path under public/assets/projects/. Falls back to `gradient` when omitted. */
  image?: string;
  flagship?: boolean;
  isMiniApp?: boolean;
  demoUrl?: string;
  sourceUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  readonly projects: Project[] = [
    // {
    //   title: 'CamPay Gateway',
    //    image: 'assets/projects/Screenshot (31).png',
    //   subtitle: 'Cambodian Merchant Payment Gateway',
    //   desc: 'A merchant-facing payment gateway with real-time KHQR settlement tracking, built on Laravel with a reactive Angular dashboard.',
    //   tags: ['Angular', 'Laravel', 'MySQL', 'Sanctum Auth', 'KHQR'],
    //   keyFeatures: [
    //     'Real-time KHQR settlement tracking with webhook-driven status updates',
    //     'Sanctum-secured merchant API with scoped tokens per business account',
    //     'Reactive Angular dashboard for transaction history and payout reconciliation',
    //   ],
    //   category: 'Full Stack',
    //   status: 'Live',
    //   year: 2026,
    //   domain: 'campay.finance.kh',
    //   gradient: 'linear-gradient(135deg, #2dd4f4, #4f9dff)',
    //   flagship: true,
    //   demoUrl: 'https://campay-demo.example.com',
    // },
    // {
    //   title: 'RUPP Course Hub',
    //   subtitle: 'University Learning Management System',
    //   desc: 'Student portal for course registration, grade tracking, and lecturer announcements used by 400+ IT Engineering students.',
    //   tags: ['Angular', 'Spring Boot', 'PostgreSQL'],
    //   keyFeatures: [
    //     'Role-based dashboards for students, lecturers, and department admins',
    //     'Automated grade computation with transcript-ready exports',
    //     'Course capacity and registration windows enforced server-side',
    //   ],
    //   category: 'Full Stack',
    //   status: 'Live',
    //   year: 2025,
    //   domain: 'course-hub.rupp.edu.kh',
    //   gradient: 'linear-gradient(135deg, #9c8bff, #4f9dff)',
    //   flagship: true,
    //   demoUrl: 'https://course-hub-demo.example.com',
    //   sourceUrl: 'https://github.com/neousopanha/rupp-course-hub',
    // },
    {
      title: 'Telegram Micro-Shop Bot',
      subtitle: 'Next-Gen Telegram WebApp with KHQR Checkout',
      desc: 'A full-stack Telegram Mini App storefront featuring instant Telegram OAuth verification, product catalogs, cart state, and KHQR checkout.',
      tags: ['Angular', 'Telegram SDK', 'Laravel', 'PostgreSQL', 'KHQR'],
      keyFeatures: [
        'One-tap Telegram OAuth — no separate signup or password required',
        'Persistent cart state synced across the Telegram WebApp and bot chat',
        'Native KHQR checkout flow with instant payment confirmation in-chat',
      ],
      category: 'Mobile',
      status: 'Live',
      year: 2026,
      domain: 't.me/my_shop_bot',
      gradient: 'linear-gradient(135deg, #6f5bd6, #2dd4a7)',
      flagship: true,
      isMiniApp: true,
      demoUrl: 'https://t.me/my_shop_bot',
    },
    {
      title: 'Cambodian SME Inventory & POS',
      subtitle: 'Dual-Currency Micro-Retail POS & Inventory Engine',
      desc: 'Micro-business Point of Sale & inventory system with real-time USD/KHR dual currency exchange, Bakong KHQR 2.0 payment generator, and thermal receipt printing.',
      tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Bakong KHQR', 'Express'],
      keyFeatures: [
        'Real-time USD & KHR dual-currency pricing engine with automated exchange rate conversion',
        'National Bakong KHQR 2.0 dynamic QR payment generator with audio confirmation triggers',
        'Intelligent low-stock buffer alerts, barcode/SKU scanner search, and thermal receipt printing',
      ],
      category: 'Full Stack',
      status: 'Live',
      year: 2026,
      domain: 'sme-pos.kh',
      gradient: 'linear-gradient(135deg, #f4b942, #ef6b6b)',
      demoUrl: 'https://sme-pos-demo.example.com',
      sourceUrl: 'https://github.com/neousopanha/sme-inventory-pos',
    },
    {
      title: 'DevNotes',
      subtitle: 'Offline-First Markdown Notes App',
      desc: 'A markdown-first note-taking app with offline-first storage and instant full-text search across notebooks.',
      tags: ['Angular', 'TypeScript', 'IndexedDB'],
      keyFeatures: [
        'Fully offline-capable — notes are readable and editable with zero connectivity',
        'Instant full-text search across every notebook, powered by an in-browser index',
        'Markdown live preview with keyboard-first navigation between notes',
      ],
      category: 'Frontend',
      status: 'Live',
      year: 2025,
      domain: 'devnotes.app',
      gradient: 'linear-gradient(135deg, #2dd4a7, #2dd4f4)',
      demoUrl: 'https://devnotes.example.com',
      sourceUrl: 'https://github.com/neousopanha/devnotes',
    },
    {
      title: 'Inventory Sync',
      subtitle: 'Multi-Branch Retail Reconciliation Tool',
      desc: 'Multi-branch inventory reconciliation tool with barcode scanning and low-stock alerts for a retail client.',
      tags: ['Angular', 'Node.js', 'Express', 'MySQL'],
      keyFeatures: [
        'Cross-branch stock reconciliation with per-branch adjustment history',
        'Barcode scanning support for fast intake and stock counts',
        'Automated low-stock alerts routed to the right branch manager',
      ],
      category: 'Full Stack',
      status: 'In Progress',
      year: 2026,
      domain: 'inventory-sync.internal',
      gradient: 'linear-gradient(135deg, #4f9dff, #2dd4a7)',
      // Still in progress — no public links yet.
    },
    {
      title: 'EventFlow',
      subtitle: 'Seat-Map Ticketing & Check-In Platform',
      desc: 'Event ticketing platform with seat-map selection, QR check-in, and an admin analytics dashboard.',
      tags: ['Angular', 'Laravel', 'Tailwind CSS'],
      keyFeatures: [
        'Interactive seat-map picker with live seat-availability locking',
        'QR-based check-in flow built for high-throughput event entrances',
        'Admin analytics dashboard covering sales, attendance, and no-show rates',
      ],
      category: 'Frontend',
      status: 'Archived',
      year: 2024,
      domain: 'eventflow.kh',
      gradient: 'linear-gradient(135deg, #ef6b6b, #9c8bff)',
      sourceUrl: 'https://github.com/neousopanha/eventflow',
    },
    {
      title: 'Sopanha AI Assistant',
      subtitle: 'Portfolio AI Concierge & Telegram Relay',
      desc: 'The floating assistant embedded on this very portfolio — a lightweight chat UI wired to a Telegram relay so no inquiry gets missed.',
      tags: ['Angular', 'Node.js', 'Telegram Bot API'],
      keyFeatures: [
        'Keyword-matched FAQ engine covering tech stack, background, and projects',
        'Every visitor message relayed straight to Telegram via a secure serverless function',
        'Shared open state so the navbar, floating bubble, and quick-suggestion chips all drive one conversation',
      ],
      category: 'AI & UI/UX',
      status: 'Live',
      year: 2026,
      domain: 'neousopanha.dev/ai',
      gradient: 'linear-gradient(135deg, #9c8bff, #ef6b6b)',
      sourceUrl: 'https://github.com/neousopanha/sopanha-ai-assistant',
    },
  ];

  readonly categories: { label: 'All' | ProjectCategory; count: number }[] = [
    { label: 'All', count: this.projects.length },
    { label: 'Full Stack', count: this.projects.filter((p) => p.category === 'Full Stack').length },
    { label: 'Frontend', count: this.projects.filter((p) => p.category === 'Frontend').length },
    { label: 'Mobile', count: this.projects.filter((p) => p.category === 'Mobile').length },
    { label: 'AI & UI/UX', count: this.projects.filter((p) => p.category === 'AI & UI/UX').length },
  ];

  viewMode = signal<'all' | 'flagship'>('all');
  activeCategory = signal<'All' | ProjectCategory>('All');
  query = signal('');
  expanded = signal<Set<string>>(new Set());

  private readonly flagshipCount = this.projects.filter((p) => p.flagship).length;

  filteredProjects = computed(() => {
    let list = this.projects;

    if (this.viewMode() === 'flagship') {
      list = list.filter((p) => p.flagship);
    }
    if (this.activeCategory() !== 'All') {
      list = list.filter((p) => p.category === this.activeCategory());
    }

    const q = this.query().trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  });

  get totalCount(): number {
    return this.viewMode() === 'flagship' ? this.flagshipCount : this.projects.length;
  }

  setViewMode(mode: 'all' | 'flagship'): void {
    this.viewMode.set(mode);
    this.activeCategory.set('All');
  }

  toggleExpanded(title: string): void {
    this.expanded.update((set) => {
      const next = new Set(set);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  }

  isExpanded(title: string): boolean {
    return this.expanded().has(title);
  }

  categorySlug(category: string): string {
    return category
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // ---- Case study modal ----------------------------------------------

  selectedProject = signal<Project | null>(null);

  openCaseStudy(project: Project): void {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeCaseStudy(): void {
    this.selectedProject.set(null);
    document.body.style.overflow = '';
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.selectedProject()) this.closeCaseStudy();
  }
}
