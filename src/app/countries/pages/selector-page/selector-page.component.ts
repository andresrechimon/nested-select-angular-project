import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { CountrySmall } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: [{value: '', disabled: true}, Validators.required]
  })

  //Fill selectors
  regions:string[] = [];
  countries:CountrySmall[] = [];
  //UI
  loading:boolean = false;

  constructor(private fb:FormBuilder,
              private cs:CountriesService) { }

  ngOnInit(): void {
    this.regions = this.cs.regions;
    //Change first selector
    this.myForm.get('region')?.valueChanges
               .pipe(
                tap((_) => {
                  this.myForm.get('country')?.reset('');
                  this.loading = true;
                }),
                switchMap(region => this.cs.getCountriesPerRegion(region))
               )
               .subscribe(countries => {
                 this.countries = countries;
                 this.loading = false;
               })
  }

  save(){
    
  }
}
