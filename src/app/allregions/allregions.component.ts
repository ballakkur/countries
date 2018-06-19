import { Component } from '@angular/core';

@Component({
  selector: 'app-allregions',
  templateUrl: './allregions.component.html',
  styleUrls: ['./allregions.component.css']
})
export class AllregionsComponent {
  public regions = ['asia','americas','africa','europe','oceania'];

}
