import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeSendComponent } from './notice-send.component';

describe('NoticeSendComponent', () => {
  let component: NoticeSendComponent;
  let fixture: ComponentFixture<NoticeSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeSendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
