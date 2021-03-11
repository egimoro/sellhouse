import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Locationh } from '../location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locations: Locationh[];
  seller = '';

  constructor(private locationService: LocationService) { }

  ngOnInit() {

    this.getLocations();
  }

  getLocations(): void{
    this.locationService.getLocations().subscribe(
      locations => this.locations = locations
    );
  }

  add(suburb: string, rooms: number, housetype: string,
    price: number, date: Date, seller:string): void{
      suburb = suburb.trim();
      housetype = housetype.trim();
      seller = seller.trim();
      

      if (!suburb) {return; }

      if (!rooms) {return; }

      if (!housetype) {return; }

      if (!price) {return; }

      if (!seller) {return; }

      if (!date) {return; }

      this.locationService.addLocation({suburb, rooms, housetype,
      price, date, seller } as Locationh).subscribe(location =>{
        this.locations.push(location)
      });
      
    
    }

    delete(location: Locationh): void{
      this.locations = this.locations.filter(l => l !== location);
      this.locationService.deleteLocation(location).subscribe();
    }


    searchSeller(): void{
      this.locationService.searchSellers(this.seller).subscribe(
        data =>{
          this.locations = data;
          console.log(data)
        },
        error =>{
          console.log(error)
        }
      );
    }

   
}
