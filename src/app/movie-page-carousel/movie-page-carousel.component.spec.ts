import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePageCarouselComponent } from './movie-page-carousel.component';

describe('MoviePageCarouselComponent', () => {
  let component: MoviePageCarouselComponent;
  let fixture: ComponentFixture<MoviePageCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviePageCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
