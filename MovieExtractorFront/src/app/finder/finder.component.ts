import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { FinderService } from '../services/finder.service';

import { Movie } from '../models/movie';
import { SearchResult } from '../models/searchResult';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent implements OnInit {
  
  public searchForm: FormGroup;

  public types: any[] = [ { name: 'Movie', value: 'movie', preChecked: true },
                          { name: 'Series', value: 'series', preChecked: false },
                          { name: 'Episode', value: 'episode', preChecked: false }
  ];

  public movies: Movie[];
  
  public collectionSize: number;
  public pageSize: number = 10;
  public page: number;
    
  constructor(private formBuilder: FormBuilder, private finderService: FinderService) { 
    this.createForm();
  }
    
  ngOnInit(): void {

    // this.searchForm.valueChanges.
    //   .map((value) => {
    //       // Here you can manipulate your value
    //       value.firstName = value.firstName.trim();
    //       return value;
    //   })
    //   .filter((value) => this.searchForm.valid)
    //   .subscribe((value) => {
    //       console.log("Model Driven Form valid value: vm = ",JSON.stringify(value));
    //   });
  }
    
  createForm() {
    this.searchForm = this.formBuilder.group({
      title: [null, [Validators.required, this.removeSpaces]],
      type: '',
      year: '',
      page: ''
    });
  }
    
  public searchSubmit() {
    let title = this.searchForm.get('title').value;
    let type = this.searchForm.get('type').value;
    let year = this.searchForm.get('year').value;
    this.page = 1;

    this.searchMovie(title, type, year, this.page);
  }

  public searchPage() {    
    let title = this.searchForm.get('title').value;
    let type = this.searchForm.get('type').value;
    let year = this.searchForm.get('year').value;
    
    this.searchMovie(title, type, year, this.page);    
  }

  private searchMovie(title: string, type: string, year: string, page: number) {
    this.finderService.getMany(title, type, year, page).subscribe((retorno: SearchResult) => {
      this.movies = retorno.Search;
      this.collectionSize = retorno.totalResults;      
    },
    (erro: any) => { 
      console.error(erro) 
    });
  }

  public removeSpaces(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
      //control.parent.get('title').markAsUntouched();
    }
    return null;
  }

}
    