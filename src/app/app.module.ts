import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {RouterModule} from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';

//component
import { NavbarComponent } from './navbar/navbar.component';
import { AllcountriesComponent } from './allcountries/allcountries.component';
import { CountryComponent } from './country/country.component';
import { AllregionsComponent } from './allregions/allregions.component';
import { NotfoundComponent } from './notfound/notfound.component';
//http service
import { HttpService } from './http.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AllcountriesComponent,
    CountryComponent,
    AllregionsComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'', component:AllregionsComponent},
      {path:'countries/:region',component:AllcountriesComponent},
      {path:'country/:country',component:CountryComponent},
      {path:'**', component:NotfoundComponent }
    ])
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
