import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeReceiveComponent } from './notice-receive.component';

describe('NoticeReceiveComponent', () => {
  let component: NoticeReceiveComponent;
  let fixture: ComponentFixture<NoticeReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeReceiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
