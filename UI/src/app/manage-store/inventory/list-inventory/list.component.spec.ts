import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewInventoryStoreComponent } from './list.component';

describe('ListViewInventoryStoreComponent', () => {
  let component: ListViewInventoryStoreComponent;
  let fixture: ComponentFixture<ListViewInventoryStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListViewInventoryStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListViewInventoryStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
