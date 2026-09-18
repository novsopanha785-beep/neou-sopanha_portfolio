import { Component, ElementRef, HostListener, ViewChild, computed, effect, signal } from '@angular/core';
import { SearchService } from '../../services/search.service';

type ResultType = 'Section' | 'Skill' | 'Project' | 'Experience' | 'Contact';

interface SearchItem {
  title: string;
  type: ResultType;
  hint: string;
  targetId: string;
}

@Component({
  selector: 'app-search-palette',
  standalone: true,
  templateUrl: './search-palette.component.html',
  styleUrl: './search-palette.component.scss',
})
export class SearchPaletteComponent {
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  query = signal('');
  activeIndex = signal(0);

  private readonly index: SearchItem[] = [
    { title: 'Home', type: 'Section', hint: 'Hero & introduction', targetId: 'home' },
    { title: 'About', type: 'Section', hint: 'Profile, philosophy, goals', targetId: 'about' },
    { title: 'Skills', type: 'Section', hint: 'Technical arsenal', targetId: 'skills' },
    { title: 'Projects', type: 'Section', hint: 'Selected work', targetId: 'projects' },
    { title: 'Experience', type: 'Section', hint: 'Career timeline', targetId: 'experience' },
    { title: 'Contact', type: 'Section', hint: 'Get in touch', targetId: 'contact' },

    { title: 'Angular', type: 'Skill', hint: 'Frontend', targetId: 'skills' },
    { title: 'TypeScript', type: 'Skill', hint: 'Frontend', targetId: 'skills' },
    { title: 'JavaScript', type: 'Skill', hint: 'Frontend', targetId: 'skills' },
    { title: 'HTML5', type: 'Skill', hint: 'Frontend', targetId: 'skills' },
    { title: 'CSS3', type: 'Skill', hint: 'Frontend', targetId: 'skills' },
    { title: 'Tailwind CSS', type: 'Skill', hint: 'Frontend', targetId: 'skills' },
    { title: 'Laravel', type: 'Skill', hint: 'Backend', targetId: 'skills' },
    { title: 'PHP', type: 'Skill', hint: 'Backend', targetId: 'skills' },
    { title: 'Java', type: 'Skill', hint: 'Backend', targetId: 'skills' },
    { title: 'Spring Boot', type: 'Skill', hint: 'Backend', targetId: 'skills' },
    { title: 'Node.js', type: 'Skill', hint: 'Backend', targetId: 'skills' },
    { title: 'Express.js', type: 'Skill', hint: 'Backend', targetId: 'skills' },
    { title: 'MySQL', type: 'Skill', hint: 'Database', targetId: 'skills' },
    { title: 'PostgreSQL', type: 'Skill', hint: 'Database', targetId: 'skills' },
    { title: 'Git & GitHub', type: 'Skill', hint: 'Tools', targetId: 'skills' },
    { title: 'Docker', type: 'Skill', hint: 'Tools', targetId: 'skills' },

    { title: 'CamPay Gateway', type: 'Project', hint: 'Payments platform', targetId: 'projects' },
    { title: 'RUPP Course Hub', type: 'Project', hint: 'Education platform', targetId: 'projects' },
    { title: 'Inventory Sync', type: 'Project', hint: 'Internal tooling', targetId: 'projects' },
    { title: 'DevNotes', type: 'Project', hint: 'Productivity app', targetId: 'projects' },
    { title: 'EventFlow', type: 'Project', hint: 'Ticketing system', targetId: 'projects' },
    { title: 'Sopanha AI Assistant', type: 'Project', hint: 'AI chat widget', targetId: 'projects' },

    { title: 'Freelance Full-Stack Developer', type: 'Experience', hint: '2025 — Present', targetId: 'experience' },
    { title: 'Bachelor of IT Engineering', type: 'Experience', hint: 'RUPP · 2024 — Present', targetId: 'experience' },
    { title: 'Junior Web Developer (Internship)', type: 'Experience', hint: '2023 — 2024', targetId: 'experience' },

    { title: 'Email', type: 'Contact', hint: 'hello@neousopanha.dev', targetId: 'contact' },
    { title: 'Phone', type: 'Contact', hint: '+855 00 000 000', targetId: 'contact' },
    { title: 'Location', type: 'Contact', hint: 'Phnom Penh, Cambodia', targetId: 'contact' },
  ];

  results = computed(() => {
    const q = this.query().trim().toLowerCase();
    const list = !q
      ? this.index.filter((i) => i.type === 'Section')
      : this.index.filter(
          (i) => i.title.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)
        );
    return list.slice(0, 8);
  });

  constructor(public search: SearchService) {
    // Focus the input and reset state every time the palette opens.
    effect(() => {
      if (this.search.open()) {
        this.query.set('');
        this.activeIndex.set(0);
        queueMicrotask(() => this.searchInput?.nativeElement.focus());
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    const meta = e.metaKey || e.ctrlKey;
    if (meta && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.search.toggle();
      return;
    }
    if (!this.search.open()) return;

    if (e.key === 'Escape') {
      this.search.hide();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.activeIndex.update((i) => Math.min(i + 1, this.results().length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.activeIndex.update((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      const item = this.results()[this.activeIndex()];
      if (item) this.select(item);
    }
  }

  select(item: SearchItem): void {
    this.search.hide();
    // Wait a tick so the overlay is gone before we scroll.
    setTimeout(() => {
      document.getElementById(item.targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }

  onQueryInput(value: string): void {
    this.query.set(value);
    this.activeIndex.set(0);
  }

  backdropClick(): void {
    this.search.hide();
  }
}
