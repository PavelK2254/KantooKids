import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningWithDisneyComponent } from './learning-with-disney.component';

describe('LearningWithDisneyComponent', () => {
  let component: LearningWithDisneyComponent;
  let fixture: ComponentFixture<LearningWithDisneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningWithDisneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningWithDisneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
