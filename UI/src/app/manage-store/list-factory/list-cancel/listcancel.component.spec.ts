import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCancelSFComponent } from './listcancel.component';

describe('ListCancelSFComponent', () => {
  let component: ListCancelSFComponent;
  let fixture: ComponentFixture<ListCancelSFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCancelSFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCancelSFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
