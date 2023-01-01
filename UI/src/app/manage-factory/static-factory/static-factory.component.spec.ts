import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticFactoryComponent } from './static-factory.component';

describe('StaticFactoryComponent', () => {
  let component: StaticFactoryComponent;
  let fixture: ComponentFixture<StaticFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticFactoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
