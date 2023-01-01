import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCancelFactoryComponent } from './listcancelfactory.component';

describe('ListCancelFactoryComponent', () => {
  let component: ListCancelFactoryComponent;
  let fixture: ComponentFixture<ListCancelFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCancelFactoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCancelFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
