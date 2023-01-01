import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubmitMerchantComponent } from './listsubmitmerchant.component';

describe('ListSubmitMerchantComponent', () => {
  let component: ListSubmitMerchantComponent;
  let fixture: ComponentFixture<ListSubmitMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubmitMerchantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSubmitMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
