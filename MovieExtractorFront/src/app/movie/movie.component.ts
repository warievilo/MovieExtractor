import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from '../models/movie';
import { FinderService } from '../services/finder.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public movie: Movie = new Movie();

  constructor(private route: ActivatedRoute, private finderService: FinderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];      
      this.searchMovie(id);
    });
  } 

  private searchMovie(id: string) {
    this.finderService.getOne(id).subscribe(
      (resp: Movie) => {
        this.movie = resp;        
      },
      (error: any) => {        
        console.error(error);
      });
  }
}
