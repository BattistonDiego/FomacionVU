import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideScissors } from '@lucide/angular';

/** Replaces a fragment that is cut off or illegible in the original documentation. */
@Component({
  selector: 'app-pending-text',
  imports: [LucideScissors],
  template: `
    <svg lucideScissors class="pending__icon" [size]="14"></svg>
    <span>Texto recortado en la documentación original · pendiente de confirmación</span>
  `,
  styleUrl: './pending-text.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'pending', role: 'note' },
})
export class PendingText {}
