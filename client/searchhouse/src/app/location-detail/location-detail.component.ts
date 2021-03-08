import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Locationh } from '../location'
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {

  locationh: Locationh;

  constructor(
    private route: ActivatedRoute,
    private locationSerivice: LocationService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.getLocation();

  }

  getLocation(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.locationSerivice.getLocation(id).subscribe(
      locationh => this.locationh = locationh
    )
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.locationSerivice.updateLocation(this.locationh).subscribe(()=>this.goBack());
  }

}
