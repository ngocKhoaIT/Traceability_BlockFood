import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticTransportComponent } from './static-transport.component';

describe('StaticTransportComponent', () => {
  let component: StaticTransportComponent;
  let fixture: ComponentFixture<StaticTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
