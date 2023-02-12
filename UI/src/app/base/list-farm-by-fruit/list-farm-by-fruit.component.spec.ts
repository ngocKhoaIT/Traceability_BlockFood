import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFarmByFruitComponent } from './list-farm-by-fruit.component';

describe('ListFarmByFruitComponent', () => {
  let component: ListFarmByFruitComponent;
  let fixture: ComponentFixture<ListFarmByFruitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFarmByFruitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFarmByFruitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
