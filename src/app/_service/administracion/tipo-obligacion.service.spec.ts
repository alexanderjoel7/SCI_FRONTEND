import { TestBed } from '@angular/core/testing';

import { TipoObligacionService } from './tipo-obligacion.service';

describe('TipoObligacionService', () => {
  let service: TipoObligacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoObligacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
