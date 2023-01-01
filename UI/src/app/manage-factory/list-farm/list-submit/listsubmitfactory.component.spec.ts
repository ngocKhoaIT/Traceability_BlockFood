import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubmitFactoryComponent } from './listsubmitfactory.component';

describe('ListSubmitFactoryComponent', () => {
  let component: ListSubmitFactoryComponent;
  let fixture: ComponentFixture<ListSubmitFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubmitFactoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSubmitFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
