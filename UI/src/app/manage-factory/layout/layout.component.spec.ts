import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryLayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: FactoryLayoutComponent;
  let fixture: ComponentFixture<FactoryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoryLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactoryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
