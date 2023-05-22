import { Component, OnInit } from '@angular/core';
import { Country } from '../../interface/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private _countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byCountries.countries;
    this.initialValue = this._countriesService.cacheStore.byCountries.term;
  }

  public searchByCountry(term: string): void {
    this.isLoading = true;
    this._countriesService.searchCountry(term).subscribe((res) => {
      this.countries = res;
      this.isLoading = false;
    });
  }
}
