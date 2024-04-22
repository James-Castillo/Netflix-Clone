import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MovieService } from 'src/app/shared/services/movie.service';
import { IVideoContent } from 'src/app/shared/models/video-content.interface';
import { forkJoin, map, Observable } from 'rxjs';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  constructor(private _authService: AuthService, private _movieService: MovieService) {}

  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources= [
    this._movieService.getMovies(),
    this._movieService.getTvShows(),
    this._movieService.getRatedMovies(),
    this._movieService.getNowPlayingMovies(),
    this._movieService.getUpcomingMovies(),
    this._movieService.getPopularMovies(),
    this._movieService.getTopRated()
  ];

  ngOnInit(): void {
    forkJoin(this.sources)
    .pipe(
      map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated])=> {
        this.bannerDetail$ =this._movieService.getBannerDetail(movies.results[0].id);
        this.bannerVideo$ = this._movieService.getBannerVideo(movies.results[0].id);
        return {movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated}
      })
    ).subscribe((res:any)=>{
      this.movies = res.movies.results as IVideoContent[];
      this.tvShows = res.tvShows.results as IVideoContent[];
      this.ratedMovies = res.ratedMovies.results as IVideoContent[];
      this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
      this.upcomingMovies = res.upcoming.results as IVideoContent[];
      this.popularMovies = res.popular.results as IVideoContent[];
      this.topRatedMovies = res.topRated.results as IVideoContent[];
      this.getMovieKey();
    })
  }

  getMovieKey() {
    this._movieService.getBannerVideo(this.movies[0].id)
    .subscribe(res=>{
    })
  }

  signOut(){
    sessionStorage.removeItem("loggedInUser");  
    this._authService.signOut();
  }

}
