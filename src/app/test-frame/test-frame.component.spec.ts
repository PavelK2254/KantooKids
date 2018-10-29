import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFrameComponent } from './test-frame.component';

describe('TestFrameComponent', () => {
  let component: TestFrameComponent;
  let fixture: ComponentFixture<TestFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
