import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { appError } from '../shared/app-error';
import { notFoundError } from '../shared/not-found';


@Component({
  selector: 'app-allcountries',
  templateUrl: './allcountries.component.html',
  styleUrls: ['./allcountries.component.css']
})
export class AllcountriesComponent implements OnInit {

  public region;
  public countries;
  public isloading: boolean = false;
  constructor(private httpservice: HttpService,
    private location: Location,
    private router: Router,
    private _route: ActivatedRoute) { }

  getback = () => {
    this.location.back();
  }
  public filterByCurrency = (currency) => {
    this.isloading = true;
    console.log(currency);
    this.httpservice.filtercurrency(currency)
      .subscribe(
        (data) => {
          console.log(data);
          this.countries = data;
          this.isloading = false;
        },
        (error: appError) => {
          this.isloading = false;
          if (error instanceof notFoundError) {
            this.router.navigate(['**']);
          }
          else
            console.log('unexpected error occured.');
          console.log(error);
        }
      );
  }
  public filterByLanguage = (lang) => {
    this.isloading = true;
    console.log(lang);
    this.httpservice.filterLanguage(lang)
      .subscribe(
        (data) => {
          console.log(data);
          this.countries = data;
          this.isloading = false;
        },
        (error: appError) => {
          this.isloading = false;
          if (error instanceof notFoundError) {
            this.router.navigate(['**']);
          }
          else
            console.log('unexpected error occured.');
          console.log(error);
        }
      );
  }
  ngOnInit() {
    this.isloading = true;
    // console.log(this._route.snapshot.paramMap);
    this._route.queryParams
      .subscribe(
        params => {
          console.log(params['language']);
          if (params['language']) {
            this.filterByLanguage(params['language']);
          }
          else if (params['currency']) {
            this.filterByCurrency(params['currency']);
          }
          else {
            this.region = this._route.snapshot.paramMap.get('region');
            if (this.region) {
              this.httpservice.getregion(this.region).subscribe(

                (data) => {
                  console.log(data);
                  this.countries = data;
                  this.isloading = false;
                },
                (error: appError) => {
                  this.isloading = false;
                  if (error instanceof notFoundError) {
                    this.router.navigate(['**']);
                  }
                  else
                    console.log('unexpected error occured.');
                  console.log(error);
                }
              );
            }
          }
        }
      );
  }

}
