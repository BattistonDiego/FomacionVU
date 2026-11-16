import { ColorSwatch } from './incident-color.model';

/** CSS background for a swatch: solid colour, or diagonal stripes like the "Cliente" band. */
export function swatchBackground(swatch: ColorSwatch): string {
  return swatch.stripeHex
    ? `repeating-linear-gradient(135deg, ${swatch.stripeHex} 0 6px, ${swatch.hex} 6px 12px)`
    : swatch.hex;
}

/** Text shown next to a colour: "#D8E4BC" or "#F5F5F5 / #E8E8E8 · rayas". */
export function swatchCode(swatch: ColorSwatch): string {
  return swatch.stripeHex ? `${swatch.hex} / ${swatch.stripeHex} · rayas` : swatch.hex;
}

/** Short version for the colour index: "#D8E4BC" or "#E8E8E8 · rayas". */
export function swatchShortCode(swatch: ColorSwatch): string {
  return swatch.stripeHex ? `${swatch.stripeHex} · rayas` : swatch.hex;
}
