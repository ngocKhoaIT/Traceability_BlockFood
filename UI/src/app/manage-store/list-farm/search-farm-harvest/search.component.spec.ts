import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFarmbyStoreComponent } from './search.component';

describe('SearchFarmbyStorebyStoreComponent', () => {
  let component: SearchFarmbyStoreComponent;
  let fixture: ComponentFixture<SearchFarmbyStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFarmbyStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFarmbyStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
