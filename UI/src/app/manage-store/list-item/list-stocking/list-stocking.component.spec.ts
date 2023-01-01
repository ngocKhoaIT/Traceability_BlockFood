import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockingComponent } from './list-stocking.component';

describe('ListStockingComponent', () => {
  let component: ListStockingComponent;
  let fixture: ComponentFixture<ListStockingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStockingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
