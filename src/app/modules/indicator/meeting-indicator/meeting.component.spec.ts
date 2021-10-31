import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingIndicatorComponent } from './meeting.component';

describe('MeetingIndicatorComponent', () => {
  let component: MeetingIndicatorComponent;
  let fixture: ComponentFixture<MeetingIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
