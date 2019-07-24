import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAttendencePage } from './my-attendence.page';

describe('MyAttendencePage', () => {
  let component: MyAttendencePage;
  let fixture: ComponentFixture<MyAttendencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAttendencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAttendencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
