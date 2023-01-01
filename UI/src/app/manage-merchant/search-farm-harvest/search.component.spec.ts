import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFarmComponent } from './search.component';

describe('SearchFarmComponent', () => {
  let component: SearchFarmComponent;
  let fixture: ComponentFixture<SearchFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFarmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
