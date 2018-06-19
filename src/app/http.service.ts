import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { appError } from './shared/app-error';
import { notFoundError } from './shared/not-found';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseurl ='https://restcountries.eu/rest/v2/';
  constructor(public _http:HttpClient ) { }
  public getregion = (region)=>
  {
    console.log(region);
    return this._http.get(`${this.baseurl}region/${region}`)
    .catch((error:Response)=>
    {
      if(error.status ===404 || error.status ===400)
      {
        return Observable.throw(new notFoundError());
      }
      return Observable.throw(new appError(error));
      
    });
  }
  public getcountry = (country)=>
  {
    console.log(country);
    return this._http.get(`${this.baseurl}name/${country}?fullText=true`)
    .catch((error:Response)=>
    {
      if(error.status ===404 || error.status ===400)
      {
        return Observable.throw(new notFoundError());
      }
      return Observable.throw(new appError(error));
    }  
  );
  }
public filtercurrency =(currency)=>
{
  return this._http.get(`${this.baseurl}currency/${currency}`)
  .catch((error:Response)=>
    {
      if(error.status ===404 || error.status ===400)
      {
        return Observable.throw(new notFoundError());
      }
      return Observable.throw(new appError(error));
    } 
  );
}
public filterLanguage =(lang)=>
{
  return this._http.get(`${this.baseurl}lang/${lang}`)
  .catch((error:Response)=>
    {
      if(error.status ===404 || error.status ===400)
      {
        return Observable.throw(new notFoundError());
      }
      return Observable.throw(new appError(error));
    } 
  );
}
}
