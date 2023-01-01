import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTransportComponent } from './search.component';

describe('SearchTransportComponent', () => {
  let component: SearchTransportComponent;
  let fixture: ComponentFixture<SearchTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
