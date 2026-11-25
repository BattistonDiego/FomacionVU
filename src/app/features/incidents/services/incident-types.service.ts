import { Injectable } from '@angular/core';

import { INCIDENT_TYPES } from '../data/incident-types.data';
import { BonusRule, IncidentType, RefundRule } from '../models/incident-type.model';
import { formatBonusValue } from '../utils/format-bonus-value';
import { blocksToPlainText } from '../../../shared/models/content-block.model';
import { FilterOption } from '../../../shared/models/filter-option.model';
import { richTextToPlain } from '../../../shared/models/rich-text.model';
import { matchesAllTermsByPrefix, normalizeForSearch, tokenize } from '../../../shared/utils/search';

/** A term such as "pr1" must match the code exactly, so it does not also return PR12. */
const CODE_TERM = /^pr\d+$/;

/**
 * Read access to incident types. Data is local for now; when a backend exists,
 * only this service needs to change.
 */
@Injectable({ providedIn: 'root' })
export class IncidentTypesService {
  private readonly incidentTypes: readonly IncidentType[] = INCIDENT_TYPES;

  private readonly searchIndex = new Map(
    this.incidentTypes.map((incident) => [incident.id, buildSearchWords(incident)]),
  );

  getAll(): readonly IncidentType[] {
    return this.incidentTypes;
  }

  getById(id: string | null | undefined): IncidentType | undefined {
    return this.incidentTypes.find((incident) => incident.id === id);
  }

  /**
   * Accent- and case-insensitive search over names (ES/FR), code, concept,
   * responsibilities and the refund / bonus rule sections. Every term must be the beginning of a
   * word; codes match exactly.
   */
  search(query: string): readonly IncidentType[] {
    const terms = tokenize(query);
    if (terms.length === 0) {
      return this.incidentTypes;
    }
    const codeTerms = terms.filter((term) => CODE_TERM.test(term));
    const wordTerms = terms.filter((term) => !CODE_TERM.test(term));
    return this.incidentTypes.filter((incident) => {
      const code = normalizeForSearch(incident.code ?? '');
      return (
        codeTerms.every((term) => term === code) &&
        matchesAllTermsByPrefix(this.searchIndex.get(incident.id) ?? [], wordTerms)
      );
    });
  }

  filterByOpenedBy(
    incidents: readonly IncidentType[],
    openedBy: string | null,
  ): readonly IncidentType[] {
    return openedBy === null
      ? incidents
      : incidents.filter((incident) => incident.openedBy === openedBy);
  }

  /** Distinct "¿Quién abre?" values (most frequent first), counted within `scope`. */
  getOpenedByOptions(scope: readonly IncidentType[] = this.incidentTypes): FilterOption[] {
    const totals = countBy(this.incidentTypes, (incident) => incident.openedBy);
    const scoped = countBy(scope, (incident) => incident.openedBy);
    return [...totals.keys()]
      .sort((a, b) => (totals.get(b) ?? 0) - (totals.get(a) ?? 0))
      .map((value) => ({ value, label: value, count: scoped.get(value) ?? 0 }));
  }

  isOpenedByValue(value: string | null | undefined): value is string {
    return !!value && this.incidentTypes.some((incident) => incident.openedBy === value);
  }
}

function buildSearchWords(incident: IncidentType): string[] {
  return tokenize(
    [
      incident.nameEs,
      incident.nameFr,
      incident.code ?? '',
      incident.openedBy,
      blocksToPlainText(incident.concept),
      blocksToPlainText(incident.managedBy),
      refundRuleText(incident.refundRule),
      bonusRuleText(incident.bonusRule),
    ].join(' '),
  );
}

/**
 * Visible texts of the "Bonos por retraso en la entrega" section (notice, criteria, table
 * headers, delivery types, formatted amounts and examples). Internal values are not indexed.
 */
function bonusRuleText(rule: BonusRule | undefined): string {
  if (!rule) {
    return '';
  }
  const { table } = rule;
  return [
    rule.title,
    richTextToPlain(rule.notice),
    ...rule.criteria.map((criterion) => richTextToPlain(criterion.text)),
    table.caption,
    table.rowHeader,
    ...table.groups.flatMap((group) => [group.title, group.legend, ...group.columns]),
    ...table.rows.flatMap((row) => [row.label, ...row.values.map(formatBonusValue)]),
    ...rule.examples.map(richTextToPlain),
  ].join(' ');
}

/**
 * Visible texts of the "Regla de anulación y reembolso" section (titles, highlights, steps,
 * chips and tip). Listed explicitly so internal values (`success`, `plus`…) are not indexed.
 */
function refundRuleText(rule: RefundRule | undefined): string {
  if (!rule) {
    return '';
  }
  return [
    rule.title,
    ...rule.scenarios.flatMap((scenario) => [
      scenario.titleStart + scenario.titleKeyword + scenario.titleEnd,
      scenario.subtitle,
      scenario.outcome,
      scenario.badge ?? '',
      scenario.detail,
    ]),
    rule.stepsTitle,
    ...rule.steps.flatMap((step) => [step.text, step.chip ?? '']),
    richTextToPlain(rule.tip),
  ].join(' ');
}

function countBy<T>(items: readonly T[], key: (item: T) => string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of items) {
    const k = key(item);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return counts;
}
