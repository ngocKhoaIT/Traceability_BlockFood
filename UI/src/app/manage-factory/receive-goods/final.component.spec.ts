import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryFactorybyStoreComponent } from './final.component';

describe('InventoryFactorybyStoreComponent', () => {
  let component: InventoryFactorybyStoreComponent;
  let fixture: ComponentFixture<InventoryFactorybyStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryFactorybyStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryFactorybyStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
