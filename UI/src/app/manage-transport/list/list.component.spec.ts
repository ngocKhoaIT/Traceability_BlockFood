import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewTransportComponent } from './list.component';

describe('ListViewTransportComponent', () => {
  let component: ListViewTransportComponent;
  let fixture: ComponentFixture<ListViewTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListViewTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListViewTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
