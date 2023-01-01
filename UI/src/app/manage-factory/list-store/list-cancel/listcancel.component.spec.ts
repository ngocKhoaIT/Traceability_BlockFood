import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCancelFSComponent } from './listcancel.component';

describe('ListCancelFSComponent', () => {
  let component: ListCancelFSComponent;
  let fixture: ComponentFixture<ListCancelFSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCancelFSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCancelFSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
