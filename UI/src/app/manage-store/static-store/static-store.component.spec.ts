import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticStoreComponent } from './static-store.component';

describe('StaticStoreComponent', () => {
  let component: StaticStoreComponent;
  let fixture: ComponentFixture<StaticStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
