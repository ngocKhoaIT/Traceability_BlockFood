import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCancelStoreComponent } from './listcancelstore.component';

describe('ListCancelStoreComponent', () => {
  let component: ListCancelStoreComponent;
  let fixture: ComponentFixture<ListCancelStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCancelStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCancelStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
