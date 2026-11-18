import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LucideBan,
  LucideChevronRight,
  LucideCircleSlash,
  LucideFileX,
  LucideInfo,
  LucidePackage,
  LucidePackageX,
  LucidePhoneOff,
  LucideTarget,
  LucideTruck,
} from '@lucide/angular';

import { ExchangeBefore } from '../../components/exchange-before/exchange-before';
import { ExchangeFlowCard } from '../../components/exchange-flow/exchange-flow';
import { ExchangeRestrictions } from '../../components/exchange-restrictions/exchange-restrictions';
import { PRODUCT_EXCHANGES } from '../../data/product-exchanges.data';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';

@Component({
  selector: 'app-product-exchanges-page',
  imports: [
    PageHeader,
    RichTextView,
    ExchangeRestrictions,
    ExchangeBefore,
    ExchangeFlowCard,
    LucideBan,
    LucideChevronRight,
    LucideCircleSlash,
    LucideFileX,
    LucideInfo,
    LucidePackage,
    LucidePackageX,
    LucidePhoneOff,
    LucideTarget,
    LucideTruck,
  ],
  templateUrl: './product-exchanges-page.html',
  styleUrl: './product-exchanges-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductExchangesPage {
  protected readonly content = PRODUCT_EXCHANGES;

  protected readonly breadcrumbs: readonly BreadcrumbItem[] = [
    { label: 'Inicio', link: '/inicio' },
    { label: 'Operaciones' },
    { label: 'Cambios de producto' },
  ];

  /** Quick-access cards: scroll to the section and move focus to its heading. */
  protected goToSection(id: string): void {
    const heading = document.getElementById(`${id}-title`);
    heading?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    heading?.focus({ preventScroll: true });
  }
}
