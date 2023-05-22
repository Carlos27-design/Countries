import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interface/countries.interface';
import { CacheStore } from '../interface/cache-store';
import { Region } from '../interface/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private _http: HttpClient) {
    this.loadLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('store', JSON.stringify(this.cacheStore));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('store')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('store')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this._http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  public searchCountryById(id: string): Observable<Country | null> {
    const url: string = `${this.apiUrl}/alpha/${id}`;

    return this._http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  public searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;

    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCapital = { term, countries })),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCountries = { term, countries })),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchRegion(region: Region): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${region}`;

    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries })),
      tap(() => this.saveToLocalStorage())
    );
  }
}
