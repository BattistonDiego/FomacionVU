/** Colour of a band in the incident list, as measured on the original documentation. */
export interface ColorSwatch {
  /** Solid colour (hex). For striped bands, the base colour. */
  readonly hex: string;
  /** Diagonal stripes colour, for striped bands ("Gris con rayas"). */
  readonly stripeHex?: string;
}

/**
 * Whether the documentation explicitly says we assign ("afectar") incidents here.
 * Left undefined when the text does not say it.
 */
export type AssignmentRule = 'afectamos' | 'no-afectamos';

/** One status/department inside a colour (e.g. "SC", "SUP SC"). */
export interface IncidentColorRole {
  /** Label as written in the documentation (e.g. "SUP SAV", "Echange", "APPROS"). */
  readonly label: string;
  readonly description: string;
  readonly assignment?: AssignmentRule;
  /** Text after "EXCEPCIÓN:" in the documentation. */
  readonly exception?: string;
}

export interface IncidentColorCategory {
  /** Anchor id, e.g. `verdes-sc-y-sup-sc`. */
  readonly id: string;
  /** Heading as written in the documentation. */
  readonly title: string;
  /** Short label for the colour index ("Buscar por color"). */
  readonly shortLabel: string;
  /** Colour name, e.g. "Verde". */
  readonly colorName: string;
  readonly swatch: ColorSwatch;
  /** Empty when the documentation gives no description (Administrador). */
  readonly roles: readonly IncidentColorRole[];
}

/** Categories under a common heading of the documentation ("BLOQUE ROSAS"). */
export interface IncidentColorGroup {
  readonly title?: string;
  readonly note?: string;
  readonly categories: readonly IncidentColorCategory[];
}
