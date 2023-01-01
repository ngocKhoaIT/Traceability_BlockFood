import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievalComponent } from './retrieval.component';

describe('RetrievalComponent', () => {
  let component: RetrievalComponent;
  let fixture: ComponentFixture<RetrievalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrievalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrievalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
