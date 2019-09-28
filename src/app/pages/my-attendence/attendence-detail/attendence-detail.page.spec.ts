import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceDetailPage } from './attendence-detail.page';

describe('AttendenceDetailPage', () => {
  let component: AttendenceDetailPage;
  let fixture: ComponentFixture<AttendenceDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendenceDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendenceDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
