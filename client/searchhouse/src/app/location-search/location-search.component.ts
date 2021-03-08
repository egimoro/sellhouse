import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounce,
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Locationh } from '../location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {

  locations$: Observable<Locationh[]>;

  private searchTerms = new Subject<string>();


  constructor(private locationService: LocationService) { }

  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    this.locations$ = this.searchTerms.pipe(

      debounceTime(300),

      distinctUntilChanged(),
      switchMap((term: string) => this.locationService.searchLocations(term)),

    );
  }

}
