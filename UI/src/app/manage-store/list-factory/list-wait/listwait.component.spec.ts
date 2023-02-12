import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWaitSFComponent } from './listwait.component';

describe('ListWaitSFComponent', () => {
  let component: ListWaitSFComponent;
  let fixture: ComponentFixture<ListWaitSFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWaitSFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWaitSFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
