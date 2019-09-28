import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSchedulePage } from './job-schedule.page';

describe('JobSchedulePage', () => {
  let component: JobSchedulePage;
  let fixture: ComponentFixture<JobSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
