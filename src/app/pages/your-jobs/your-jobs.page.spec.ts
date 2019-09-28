import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourJobsPage } from './your-jobs.page';

describe('YourJobsPage', () => {
  let component: YourJobsPage;
  let fixture: ComponentFixture<YourJobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourJobsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
