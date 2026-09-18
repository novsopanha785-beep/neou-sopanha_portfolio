import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TelegramService } from '../../services/telegram.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private fb = new FormBuilder();

  submitted = signal(false);
  copied = signal(false);
  sending = signal(false);

  readonly email = 'novsopanha785@gmail.com';

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private telegram: TelegramService) {}

  get f() {
    return this.form.controls;
  }

  copyEmail(): void {
    navigator.clipboard?.writeText(this.email);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, subject, message } = this.form.getRawValue();
    this.sending.set(true);

    await this.telegram.notify({ source: 'Contact Form', name, email, subject, message });

    this.sending.set(false);
    this.submitted.set(true);
    this.form.reset();
  }
}
