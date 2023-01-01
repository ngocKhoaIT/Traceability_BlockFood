import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantLayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: MerchantLayoutComponent;
  let fixture: ComponentFixture<MerchantLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
