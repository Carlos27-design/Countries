import { Component, Input } from '@angular/core';
import { Country } from '../../interface/countries.interface';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [],
})
export class CountryTableComponent {
  @Input()
  public countries: Country[] = [];
}
