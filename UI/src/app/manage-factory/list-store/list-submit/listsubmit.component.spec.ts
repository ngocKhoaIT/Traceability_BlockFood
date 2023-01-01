import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubmitFSComponent } from './listsubmit.component';

describe('ListSubmitFSComponent', () => {
  let component: ListSubmitFSComponent;
  let fixture: ComponentFixture<ListSubmitFSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubmitFSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSubmitFSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
