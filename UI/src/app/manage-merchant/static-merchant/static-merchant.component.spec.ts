import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticMerchantComponent } from './static-merchant.component';

describe('StaticMerchantComponent', () => {
  let component: StaticMerchantComponent;
  let fixture: ComponentFixture<StaticMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticMerchantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
