import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWaitMerchantComponent } from './listwaitmerchant.component';

describe('ListWaitMerchantComponent', () => {
  let component: ListWaitMerchantComponent;
  let fixture: ComponentFixture<ListWaitMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWaitMerchantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWaitMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
