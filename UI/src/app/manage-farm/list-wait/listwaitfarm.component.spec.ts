import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWaitFarmComponent } from './listwaitfarm.component';

describe('ListWaitFarmComponent', () => {
  let component: ListWaitFarmComponent;
  let fixture: ComponentFixture<ListWaitFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWaitFarmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWaitFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
