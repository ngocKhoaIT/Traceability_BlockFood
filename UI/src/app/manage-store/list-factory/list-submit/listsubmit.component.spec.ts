import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubmitSFComponent } from './listsubmit.component';

describe('ListSubmitSFComponent', () => {
  let component: ListSubmitSFComponent;
  let fixture: ComponentFixture<ListSubmitSFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubmitSFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSubmitSFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
