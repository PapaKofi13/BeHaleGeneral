import { FuncService } from './../../services/func.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.component.html',
  styleUrls: ['./livefeed.component.scss']
})
export class LivefeedComponent implements OnInit {
  public vData;
  public vAllData;
  public searchCountry: any;
  constructor(private funcService: FuncService) { }

  ngOnInit() {
    this.getVirusData();
    this.getAllVirusData();
  }

  public getVirusData() {
    this.funcService.getVAll().subscribe((data) => {
      this.vData = data;
    });
  }

  public getAllVirusData() {
    this.funcService.getVAllByCountries().subscribe((data) => {
      this.vAllData = data;
      console.log(data);
    });
  }
}
