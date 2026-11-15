import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideChevronRight, LucidePackage, LucideShoppingCart } from '@lucide/angular';

import { DiscountConditionsBlock } from '../../components/discount-conditions/discount-conditions';
import { FlashSaleTable } from '../../components/flash-sale-table/flash-sale-table';
import { ProposalCard } from '../../components/proposal-card/proposal-card';
import { DISCOUNTS } from '../../data/discounts.data';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';

@Component({
  selector: 'app-discounts-page',
  imports: [
    PageHeader,
    FlashSaleTable,
    ProposalCard,
    DiscountConditionsBlock,
    LucideChevronRight,
    LucidePackage,
    LucideShoppingCart,
  ],
  templateUrl: './discounts-page.html',
  styleUrl: './discounts-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountsPage {
  protected readonly content = DISCOUNTS;

  protected readonly breadcrumbs: readonly BreadcrumbItem[] = [
    { label: 'Inicio', link: '/inicio' },
    { label: 'Operaciones' },
    { label: 'Descuentos' },
  ];

  /** Quick-access cards: scroll to the section and move focus to its heading. */
  protected goToSection(id: string): void {
    const heading = document.getElementById(`${id}-title`);
    heading?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    heading?.focus({ preventScroll: true });
  }
}
