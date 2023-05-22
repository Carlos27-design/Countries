import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interface/countries.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  constructor(
    private _route: ActivatedRoute,
    private _countriesService: CountriesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params
      .pipe(switchMap(({ id }) => this._countriesService.searchCountryById(id)))
      .subscribe((country) => {
        if (!country) {
          return this._router.navigateByUrl('countries/by-capital');
        }

        return (this.country = country);
      });
  }
}
