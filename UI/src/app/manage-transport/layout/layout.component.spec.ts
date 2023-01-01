import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportLayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: TransportLayoutComponent;
  let fixture: ComponentFixture<TransportLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
