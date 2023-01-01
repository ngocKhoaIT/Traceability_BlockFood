import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCancelFarmComponent } from './listcancelfarm.component';

describe('ListCancelFarmComponent', () => {
  let component: ListCancelFarmComponent;
  let fixture: ComponentFixture<ListCancelFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCancelFarmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCancelFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
