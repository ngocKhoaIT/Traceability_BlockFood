import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWaitFSComponent } from './listwait.component';

describe('ListWaitFSComponent', () => {
  let component: ListWaitFSComponent;
  let fixture: ComponentFixture<ListWaitFSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWaitFSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWaitFSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
