import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal } from '@angular/core';
import { LucideCheck, LucideCopy } from '@lucide/angular';

/** Monospace value with a "Copiar" button (e.g. escalade subject or text examples). */
@Component({
  selector: 'app-copy-snippet',
  imports: [LucideCheck, LucideCopy],
  template: `
    <code class="snippet__value">{{ value() }}</code>
    <button type="button" class="snippet__button" (click)="copy()" [attr.aria-label]="'Copiar «' + value() + '»'">
      @if (copied()) {
        <svg lucideCheck [size]="14"></svg>
        Copiado
      } @else {
        <svg lucideCopy [size]="14"></svg>
        Copiar
      }
    </button>
    <span class="visually-hidden" aria-live="polite">{{ copied() ? 'Copiado al portapapeles' : '' }}</span>
  `,
  styleUrl: './copy-snippet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopySnippet {
  readonly value = input.required<string>();

  protected readonly copied = signal(false);
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected async copy(): Promise<void> {
    const ok = await writeToClipboard(this.value());
    if (!ok) {
      return;
    }
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 1600);
  }
}

async function writeToClipboard(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Fallback for browsers/contexts without the async Clipboard API.
    try {
      const area = document.createElement('textarea');
      area.value = value;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
