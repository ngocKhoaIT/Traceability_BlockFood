import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmLayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: FarmLayoutComponent;
  let fixture: ComponentFixture<FarmLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
