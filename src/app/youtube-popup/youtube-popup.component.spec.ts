import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubePopupComponent } from './youtube-popup.component';

describe('YoutubePopupComponent', () => {
  let component: YoutubePopupComponent;
  let fixture: ComponentFixture<YoutubePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
