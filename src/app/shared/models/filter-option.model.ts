export interface FilterOption {
  readonly value: string;
  readonly label: string;
  /** Number of items matching this option within the current search. */
  readonly count: number;
}
