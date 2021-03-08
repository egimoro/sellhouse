import { Component, OnInit } from '@angular/core';
import { Locationh } from '../location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  locations: Locationh[] = [];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.getLocations();
  }

  getLocations(): void{
    this.locationService.getLocations().subscribe(
      locations => this.locations = locations
    )
  }

}
