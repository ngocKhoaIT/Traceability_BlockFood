import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWaitStoreComponent } from './listwaitstore.component';

describe('ListWaitStoreComponent', () => {
  let component: ListWaitStoreComponent;
  let fixture: ComponentFixture<ListWaitStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWaitStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWaitStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
