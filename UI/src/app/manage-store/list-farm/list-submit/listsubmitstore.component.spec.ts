import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubmitStoreComponent } from './listsubmitstore.component';

describe('ListSubmitStoreComponent', () => {
  let component: ListSubmitStoreComponent;
  let fixture: ComponentFixture<ListSubmitStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubmitStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSubmitStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
