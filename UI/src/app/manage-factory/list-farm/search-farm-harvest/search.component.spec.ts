import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFarmbyFactoryComponent } from './search.component';

describe('SearchFarmbyFactoryComponent', () => {
  let component: SearchFarmbyFactoryComponent;
  let fixture: ComponentFixture<SearchFarmbyFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFarmbyFactoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFarmbyFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
