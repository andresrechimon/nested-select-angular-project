import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country, CountrySmall } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _baseUrl:string = 'https://restcountries.com';
  private _regions:string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions():string[]{
    return this._regions;
  }

  constructor(private http:HttpClient) { }

  getCountriesPerRegion(region:string): Observable<CountrySmall[]>{
    return this.http.get<CountrySmall[]>(`${this._baseUrl}/v3.1/region/${region}?fileds=name,cca3`)
  }
}
