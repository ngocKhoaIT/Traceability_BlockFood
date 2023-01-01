import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCancelMerchantComponent } from './listcancelmerchant.component';

describe('ListCancelMerchantComponent', () => {
  let component: ListCancelMerchantComponent;
  let fixture: ComponentFixture<ListCancelMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCancelMerchantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCancelMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
