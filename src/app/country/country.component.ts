import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { appError } from '../shared/app-error';
import { notFoundError } from '../shared/not-found';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
public country;
public info;
public isloading:boolean = false;
  constructor(public httpservice:HttpService,
    private router:Router,
    public _route:ActivatedRoute,
    public location:Location) {
    
    this.isloading =true;

     }
 getBack()
 {
   this.location.back();
 }
  ngOnInit() {
    console.log("ngoninit");
    // console.log(this._route.snapshot.paramMap.get('country'));
    this.country = this._route.snapshot.paramMap.get('country');
    this.httpservice.getcountry(this.country)
    .subscribe(
      (data)=>
      {
          this.info =data;
          this.isloading = false;
          console.log(this.info);
      },
      (error:appError)=>
      {
        this.isloading = false;
        if(error instanceof notFoundError)
        {
          this.router.navigate(['**']);
        }
        else
        console.log('unexpected error occured.');
        console.log(error);
      }
    );
  }

}
