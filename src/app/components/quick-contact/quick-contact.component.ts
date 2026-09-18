import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-quick-contact',
  standalone: true,
  templateUrl: './quick-contact.component.html',
  styleUrl: './quick-contact.component.scss',
})
export class QuickContactComponent {
  open = signal(false);

  readonly telegramUrl = 'https://t.me/nha_nhazzz';
  readonly phoneDisplay = '(+855) 81 714 434';
  readonly phoneHref = 'tel:+85581714434';

  toggle(): void {
    this.open.update((v) => !v);
  }
}
