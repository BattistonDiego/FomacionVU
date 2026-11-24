import { RichText } from '../../../shared/models/rich-text.model';

export type NewsPriority = 'important' | 'normal';

// ── "La regla": text + numbered steps ──
export interface RuleOption {
  readonly icon: 'pickup-only' | 'pickup-and-resend';
  readonly label: string;
}

export interface RuleStep {
  readonly title: string;
  readonly text?: string;
  /** Shown with a red border and the "Obligatorio" tag. */
  readonly mandatory?: boolean;
  readonly options?: readonly RuleOption[];
}

export interface RuleSection {
  readonly kind: 'rule';
  readonly title: string;
  readonly text: RichText;
  readonly steps: readonly RuleStep[];
}

// ── "¿Por qué es tan importante?": with / without ──
export interface ComparisonColumn {
  readonly title: string;
  readonly items: readonly string[];
}

export interface ComparisonSection {
  readonly kind: 'comparison';
  readonly title: string;
  readonly text: RichText;
  readonly positive: ComparisonColumn;
  readonly negative: ComparisonColumn;
}

// ── "Ejemplo real": vertical timeline ──
export interface TimelineEvent {
  readonly label: string;
  readonly text: string;
  /** Red marker and label (e.g. the waiting time). */
  readonly highlight?: boolean;
}

export interface ExampleCard {
  readonly kind: 'example';
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly events: readonly TimelineEvent[];
  readonly note?: string;
}

// ── "¿Cómo vamos?": figures + progress bar ──
export interface Metric {
  readonly value: string;
  readonly label: string;
  readonly tone: 'success' | 'danger';
}

export interface MetricsCard {
  readonly kind: 'metrics';
  readonly eyebrow: string;
  readonly title: string;
  readonly metrics: readonly Metric[];
  /** Percentages of the bar (green / red). */
  readonly progress: { readonly success: number; readonly danger: number };
  /** Accessible description of the bar. */
  readonly progressLabel: string;
  readonly text?: string;
}

/** Two cards side by side (stacked on small screens). */
export interface PairSection {
  readonly kind: 'pair';
  readonly cards: readonly (ExampleCard | MetricsCard)[];
}

// ── "Recordatorio clave": do / don't ──
export interface ReminderItem {
  readonly tone: 'do' | 'dont';
  readonly text: RichText;
}

export interface ReminderSection {
  readonly kind: 'reminder';
  readonly title: string;
  readonly items: readonly ReminderItem[];
}

export type NewsSection = RuleSection | ComparisonSection | PairSection | ReminderSection;

/** One announcement ("comunicado") of the Novedades section. */
export interface News {
  readonly id: string;
  /** URL segment: /novedades/:slug */
  readonly slug: string;
  readonly title: string;
  /** Line shown in the home banner; falls back to `title` when missing. */
  readonly headline?: string;
  /** Short text for the list and the search. */
  readonly summary: string;
  /** ISO date (YYYY-MM-DD). */
  readonly publishedAt: string;
  readonly priority: NewsPriority;
  readonly tags: readonly string[];
  readonly readingMinutes: number;
  /** Introduction shown in the hero. */
  readonly intro: string;
  readonly sections: readonly NewsSection[];
}
