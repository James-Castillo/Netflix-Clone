import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCarrouselComponent } from './movie-carrousel.component';

describe('MovieCarrouselComponent', () => {
  let component: MovieCarrouselComponent;
  let fixture: ComponentFixture<MovieCarrouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCarrouselComponent]
    });
    fixture = TestBed.createComponent(MovieCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
