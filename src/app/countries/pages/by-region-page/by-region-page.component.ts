import { Component, OnInit } from '@angular/core';
import { Country } from '../../interface/countries.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interface/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  constructor(private _countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this._countriesService.cacheStore.byRegion.region;
  }

  public byRegion(term: Region): void {
    this.selectedRegion = term;
    this.isLoading = true;
    this._countriesService.searchRegion(term).subscribe((res) => {
      this.countries = res;
      this.isLoading = false;
    });
  }
}
