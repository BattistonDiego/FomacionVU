import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';
import { LucideSearch, LucideX } from '@lucide/angular';

/** Search field with a clear button. Two-way bindable: `[(value)]`. */
@Component({
  selector: 'app-search-input',
  imports: [LucideSearch, LucideX],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.search--lg]': 'size() === "lg"' },
})
export class SearchInput {
  readonly value = model('');
  readonly placeholder = input('');
  /** Accessible name of the field. */
  readonly label = input.required<string>();
  readonly clearLabel = input('Borrar búsqueda');
  /** `lg` = taller field (home page). Default size is unchanged. */
  readonly size = input<'md' | 'lg'>('md');

  private readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected clear(): void {
    this.value.set('');
    this.field().nativeElement.focus();
  }
}
