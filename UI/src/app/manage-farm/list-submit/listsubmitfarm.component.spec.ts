import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubmitFarmComponent } from './listsubmitfarm.component';

describe('ListSubmitFarmComponent', () => {
  let component: ListSubmitFarmComponent;
  let fixture: ComponentFixture<ListSubmitFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubmitFarmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSubmitFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
