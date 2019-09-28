import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailPage } from './job-detail.page';

describe('JobDetailPage', () => {
  let component: JobDetailPage;
  let fixture: ComponentFixture<JobDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
