import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWaitFactoryComponent } from './listwaitfactory.component';

describe('ListWaitFactoryComponent', () => {
  let component: ListWaitFactoryComponent;
  let fixture: ComponentFixture<ListWaitFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWaitFactoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWaitFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
