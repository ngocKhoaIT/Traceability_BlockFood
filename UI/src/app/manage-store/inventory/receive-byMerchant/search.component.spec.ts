import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMerchantbyStoreComponent } from './search.component';

describe('InventoryMerchantbyStoreComponent', () => {
  let component: InventoryMerchantbyStoreComponent;
  let fixture: ComponentFixture<InventoryMerchantbyStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryMerchantbyStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryMerchantbyStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
