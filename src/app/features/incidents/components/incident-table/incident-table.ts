import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideChevronRight, LucideTriangleAlert } from '@lucide/angular';

import { IncidentType } from '../../models/incident-type.model';
import { firstTextBlock } from '../../../../shared/models/content-block.model';
import { ContentBlocks } from '../../../../shared/components/content-blocks/content-blocks';

@Component({
  selector: 'app-incident-table',
  imports: [RouterLink, ContentBlocks, LucideChevronRight, LucideTriangleAlert],
  templateUrl: './incident-table.html',
  styleUrl: './incident-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentTable {
  readonly incidents = input.required<readonly IncidentType[]>();

  protected preview(incident: IncidentType): string {
    return firstTextBlock(incident.concept) ?? '';
  }
}
