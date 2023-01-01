import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticFarmComponent } from './static-farm.component';

describe('StaticFarmComponent', () => {
  let component: StaticFarmComponent;
  let fixture: ComponentFixture<StaticFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticFarmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
