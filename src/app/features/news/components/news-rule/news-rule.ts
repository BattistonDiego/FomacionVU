import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideArrowLeftRight, LucidePackage, LucidePin } from '@lucide/angular';

import { RuleSection } from '../../models/news.model';
import { RichTextView } from '../../../../shared/components/rich-text/rich-text';

/** "La regla": soft red card with the rule and its numbered steps. */
@Component({
  selector: 'app-news-rule',
  imports: [RichTextView, LucideArrowLeftRight, LucidePackage, LucidePin],
  templateUrl: './news-rule.html',
  styleUrl: './news-rule.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsRule {
  readonly section = input.required<RuleSection>();
}
