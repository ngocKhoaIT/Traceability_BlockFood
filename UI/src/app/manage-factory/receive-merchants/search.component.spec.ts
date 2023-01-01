import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFactoryComponent } from './search.component';

describe('SearchFactoryComponent', () => {
  let component: SearchFactoryComponent;
  let fixture: ComponentFixture<SearchFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFactoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
