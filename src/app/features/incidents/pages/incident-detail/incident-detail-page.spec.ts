import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { IncidentDetailPage } from './incident-detail-page';

describe('IncidentDetailPage', () => {
  const open = async (id: string) => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(
          [{ path: 'incidencias/:id', component: IncidentDetailPage }],
          withComponentInputBinding(),
        ),
      ],
    });
    const harness = await RouterTestingHarness.create(`/incidencias/${id}`);
    return harness.routeNativeElement as HTMLElement;
  };

  it('shows all the information of an incident type', async () => {
    const page = await open('pr6-sufrimiento');
    expect(page.querySelector('h1')?.textContent).toContain('Sufrimiento');
    expect(page.textContent).toContain('PR6');
    expect(page.textContent).toContain('Souffrance');
    expect(page.textContent).toContain('Concepto');
    expect(page.textContent).toContain('SC/LOG/AUTO');
    expect(page.textContent).toContain('SC/LOG/Automática');
    const back = page.querySelector<HTMLAnchorElement>('.detail__back');
    expect(back?.textContent).toContain('Volver a tipos de incidencia');
    expect(back?.getAttribute('href')).toBe('/incidencias');
  });

  it('renders "OJO" sentences as highlighted notes', async () => {
    const page = await open('pr12-retraso-en-la-entrega');
    expect(page.querySelector('.block--note')?.textContent).toContain(
      'OJO solo podemos abrir esta incidencia siempre que el pedido tenga EDI.',
    );
  });

  it('flags cut-off fragments as pending confirmation', async () => {
    const page = await open('pr2-no-localizado-en-el-transportista');
    const pending = page.querySelectorAll('app-pending-text');
    expect(pending.length).toBe(2);
    expect(pending[0].textContent).toContain(
      'Texto recortado en la documentación original · pendiente de confirmación',
    );
  });

  it('shows the ⚠️ warning of #8', async () => {
    const page = await open('pr8-anulacion-antes-de-la-expedicion');
    expect(page.querySelector('.source-warning')?.textContent).toContain(
      'coincide con el de PR7 (Retractation AVANT expedition)',
    );
  });

  it('shows a not-found state for an unknown id', async () => {
    const page = await open('no-existe');
    expect(page.querySelector('h1')?.textContent).toContain('Tipo de incidencia no encontrado');
  });

  describe('"Regla de anulación y reembolso (SAV)" section', () => {
    const clean = (el: Element | null | undefined) => el?.textContent?.replace(/\s+/g, ' ').trim();
    const all = (root: ParentNode, selector: string) =>
      [...root.querySelectorAll(selector)].map((el) => clean(el));

    it('is shown on PR7, below "Concepto", labelled by its title', async () => {
      const page = await open('pr7-anulacion-antes-de-la-expedicion');
      const section = page.querySelector('app-refund-rule section');
      expect(section?.getAttribute('aria-labelledby')).toBe('refund-rule-title');
      expect(clean(page.querySelector('#refund-rule-title'))).toBe(
        'Regla de anulación y reembolso (SAV)',
      );
      // Inside the main column, after the concept and its "OJO" note.
      const main = page.querySelector('.detail__main')!;
      expect(main.lastElementChild?.tagName.toLowerCase()).toBe('app-refund-rule');
      expect(main.querySelector('.block--note')).not.toBeNull();
    });

    it('is not shown on an incident type without refundRule', async () => {
      const page = await open('pr6-sufrimiento');
      expect(page.querySelector('app-refund-rule')).toBeNull();
    });

    it('shows before/after cards that do not depend on colour only', async () => {
      const page = await open('pr7-anulacion-antes-de-la-expedicion');
      expect(all(page, '.scenario__title')).toEqual([
        'Anulación ANTES de la expedición',
        'Anulación DESPUÉS de la expedición',
      ]);
      expect(all(page, '.scenario__keyword')).toEqual(['ANTES', 'DESPUÉS']);
      expect(all(page, '.outcome__value')).toEqual([
        'Reembolso total',
        'Solo el valor del producto',
      ]);
      expect(all(page, '.outcome__badge')).toEqual(['100%']);
      expect(all(page, '.outcome__detail')).toEqual([
        'Incluye: Producto + gastos de envío',
        'Se descuenta: Se descuentan los gastos de envío / devolución',
      ]);
      expect(page.querySelectorAll('.scenario--attention').length).toBe(1);
    });

    it('renders the 4 steps in an ordered list, with system chips', async () => {
      const page = await open('pr7-anulacion-antes-de-la-expedicion');
      const steps = page.querySelectorAll('ol.steps__list > li');
      expect(steps.length).toBe(4);
      expect(all(page, '.step__body')).toEqual([
        'Abrir la incidencia de anulación',
        'Marcar la opción ¿Desea anular?: Sí',
        'Asignar la incidencia a Reembolso',
        'El proceso de reembolso se inicia automáticamente en el sistema Automático',
      ]);
      expect(all(page, '.step__chip')).toEqual(['¿Desea anular?: Sí', 'Reembolso']);
    });

    it('marks step 4 as automatic (green check and "AUTOMÁTICO" badge)', async () => {
      const page = await open('pr7-anulacion-antes-de-la-expedicion');
      const steps = page.querySelectorAll('ol.steps__list > li');
      const last = steps[3];
      expect(last.classList).toContain('step--auto');
      expect(clean(last.querySelector('.step__badge'))?.toUpperCase()).toBe('AUTOMÁTICO');
      expect(last.querySelector('.step__marker svg')).not.toBeNull();
      expect(page.querySelectorAll('.step--auto').length).toBe(1);
    });

    it('ends with the blue tip', async () => {
      const page = await open('pr7-anulacion-antes-de-la-expedicion');
      const tip = page.querySelector('app-refund-rule .tip');
      expect(tip?.getAttribute('role')).toBe('note');
      expect(clean(tip?.querySelector('strong'))).toBe('Consejo:');
      expect(clean(tip)).toContain('Así se evitan reclamaciones después.');
    });
  });

  describe('"Bonos por retraso en la entrega" section', () => {
    const clean = (el: Element | null | undefined) => el?.textContent?.replace(/\s+/g, ' ').trim();
    const all = (root: ParentNode, selector: string) =>
      [...root.querySelectorAll(selector)].map((el) => clean(el));
    const PR12 = 'pr12-retraso-en-la-entrega';

    it('is shown on PR12, below "Concepto", labelled by its title', async () => {
      const page = await open(PR12);
      const section = page.querySelector('app-bonus-rule section');
      expect(section?.getAttribute('aria-labelledby')).toBe('bonus-rule-title');
      expect(clean(page.querySelector('#bonus-rule-title'))).toBe(
        'Bonos por retraso en la entrega',
      );
      const main = page.querySelector('.detail__main')!;
      expect(main.lastElementChild?.tagName.toLowerCase()).toBe('app-bonus-rule');
      expect(main.querySelector('.block--note')).not.toBeNull();
    });

    it('is not shown on incident types without bonusRule (PR6, PR7)', async () => {
      expect((await open('pr6-sufrimiento')).querySelector('app-bonus-rule')).toBeNull();
      TestBed.resetTestingModule();
      const pr7 = await open('pr7-anulacion-antes-de-la-expedicion');
      expect(pr7.querySelector('app-bonus-rule')).toBeNull();
      expect(pr7.querySelector('app-refund-rule')).not.toBeNull();
    });

    it('shows the "no refunds" notice and how to read the table, with correct spacing', async () => {
      const page = await open(PR12);
      expect(clean(page.querySelector('.notice'))).toBe(
        'Importante: no hacemos reembolsos. Ofrecemos un bono al cliente para sus futuras compras.',
      );
      expect(all(page, '.criterion')).toEqual([
        'El bono se calcula sobre los gastos de envío, no sobre el valor del producto.',
        'Depende del importe de los gastos de envío (menos o más de 150 €) y del tiempo de retraso (1h–24h o más de 24h).',
      ]);
    });

    it('renders a real table with a hidden caption and a two-level header', async () => {
      const page = await open(PR12);
      const table = page.querySelector('app-bonus-table table')!;
      expect(clean(table.querySelector('caption'))).toBe(
        'Bonos por tipo de entrega, importe de los gastos de envío y tiempo de retraso',
      );
      expect(table.querySelector('caption')?.classList).toContain('visually-hidden');

      const corner = table.querySelector('thead tr:first-child th:first-child')!;
      expect(clean(corner)).toBe('Tipo de entrega');
      expect(corner.getAttribute('rowspan')).toBe('2');

      const groups = [...table.querySelectorAll('th[scope="colgroup"]')];
      expect(groups.map((th) => th.getAttribute('colspan'))).toEqual(['2', '2']);
      // Title and legend are read with a space between them.
      expect(groups.map((th) => clean(th))).toEqual([
        'Gastos de envío menos de 150 € Bono de importe fijo (€)',
        'Gastos de envío más de 150 € % sobre los gastos de envío',
      ]);
      expect(groups[1].classList).toContain('is-info');
      expect(all(table, 'thead th.bonus__column')).toEqual([
        '1h – 24h',
        'Más de 24h',
        '1h – 24h',
        'Más de 24h',
      ]);
    });

    it('has 3 rows with the right, Spanish-formatted values', async () => {
      const page = await open(PR12);
      const rows = [...page.querySelectorAll('app-bonus-table tbody tr')];
      expect(rows.length).toBe(3);
      expect(rows.map((row) => clean(row.querySelector('th[scope="row"]')))).toEqual([
        'Messagerie',
        'LC',
        'LS',
      ]);
      expect(rows.map((row) => all(row, 'td'))).toEqual([
        ['20 €', '30 €', '30 %', '40 %'],
        ['25 €', '50 €', '30 %', '40 %'],
        ['25 €', '50 €', '30 %', '40 %'],
      ]);
      // No-break space before the symbol; style comes from the value kind.
      const cells = [...rows[0].querySelectorAll('td')];
      expect(cells[0].textContent?.trim()).toBe('20 €');
      expect(cells[2].textContent?.trim()).toBe('30 %');
      expect(cells.map((td) => td.classList.contains('is-percent'))).toEqual([
        false,
        false,
        true,
        true,
      ]);
    });

    it('ends with the two examples in the blue tip box', async () => {
      const page = await open(PR12);
      const tip = page.querySelector('app-bonus-rule .tip');
      expect(tip?.getAttribute('role')).toBe('note');
      expect(all(tip!, 'p')).toEqual([
        'Ejemplo 1: entrega Messagerie, gastos de envío 50 € (menos de 150 €), retraso de 30h → bono de 30 €.',
        'Ejemplo 2: entrega LC, gastos de envío 200 € (más de 150 €), retraso de 10h → bono del 30 % de 200 € = 60 €.',
      ]);
    });
  });
});
