import { AfterViewInit, Component, HostListener, OnDestroy, signal } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { ChatService } from '../../services/chat.service';

interface NavLink {
  label: string;
  id: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  constructor(public search: SearchService, public chat: ChatService) {}

  readonly links: NavLink[] = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  menuOpen = signal(false);
  scrolled = signal(false);
  isLight = signal(false);
  activeId = signal('home');

  private observer?: IntersectionObserver;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  ngAfterViewInit(): void {
    // Scroll-spy: highlight whichever section is currently most in view.
    const sections = this.links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);

    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) this.activeId.set(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  goTo(id: string): void {
    this.activeId.set(id);
    this.closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleTheme(): void {
    this.isLight.update((v) => !v);
    document.documentElement.classList.toggle('light-theme', this.isLight());
  }
}
