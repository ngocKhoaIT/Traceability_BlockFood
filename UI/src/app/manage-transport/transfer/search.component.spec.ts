import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTransportOrderComponent } from './search.component';

describe('SearchTransportComponent', () => {
  let component: SearchTransportOrderComponent;
  let fixture: ComponentFixture<SearchTransportOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTransportOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTransportOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
