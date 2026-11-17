import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LucideCalendarClock,
  LucideChevronRight,
  LucideClock,
  LucideListOrdered,
  LucideTriangleAlert,
} from '@lucide/angular';

import { AfterFlow } from '../../components/after-flow/after-flow';
import { DeliveryScenarioCard } from '../../components/delivery-scenario/delivery-scenario';
import { PaymentProcedure } from '../../components/payment-procedure/payment-procedure';
import { ADDITIONAL_PAYMENTS } from '../../data/additional-payments.data';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';

@Component({
  selector: 'app-additional-payments-page',
  imports: [
    PageHeader,
    PaymentProcedure,
    AfterFlow,
    DeliveryScenarioCard,
    RichTextView,
    LucideCalendarClock,
    LucideChevronRight,
    LucideClock,
    LucideListOrdered,
    LucideTriangleAlert,
  ],
  templateUrl: './additional-payments-page.html',
  styleUrl: './additional-payments-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalPaymentsPage {
  protected readonly content = ADDITIONAL_PAYMENTS;

  protected readonly breadcrumbs: readonly BreadcrumbItem[] = [
    { label: 'Inicio', link: '/inicio' },
    { label: 'Operaciones' },
    { label: 'Pagos adicionales' },
  ];

  /** Quick-access cards: scroll to the section and move focus to its heading. */
  protected goToSection(id: string): void {
    const heading = document.getElementById(`${id}-title`);
    heading?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    heading?.focus({ preventScroll: true });
  }
}
