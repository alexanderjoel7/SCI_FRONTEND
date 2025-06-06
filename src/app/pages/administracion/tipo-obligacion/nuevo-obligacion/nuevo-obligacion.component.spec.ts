import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoObligacionComponent } from './nuevo-obligacion.component';

describe('NuevoObligacionComponent', () => {
  let component: NuevoObligacionComponent;
  let fixture: ComponentFixture<NuevoObligacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoObligacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoObligacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
