import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewInventoryFactoryComponent } from './list.component';

describe('ListViewInventoryFactoryComponent', () => {
  let component: ListViewInventoryFactoryComponent;
  let fixture: ComponentFixture<ListViewInventoryFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListViewInventoryFactoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListViewInventoryFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
