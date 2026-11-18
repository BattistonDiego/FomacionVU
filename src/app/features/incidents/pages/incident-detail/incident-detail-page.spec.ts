import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { IncidentDetailPage } from './incident-detail-page';

describe('IncidentDetailPage', () => {
  const open = async (id: string) => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'incidencias/:id', component: IncidentDetailPage }], withComponentInputBinding()),
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
});
