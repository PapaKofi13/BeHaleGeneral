import { FuncService } from './../services/func.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public allData = [];
  public lastData;
  constructor(private funcService: FuncService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  public getCategory() {
    this.funcService.getCatlimitFeeds().subscribe(data => {
      data.docs.map(mdata => {
        this.allData.push(mdata.data());
        console.log(this.allData);
      });
      const arrlast = data.docs[data.docs.length - 1];
      this.lastData = arrlast;
    });
  }

  public getMoreFeeds(e) {
    this.funcService.getMoreCatFeeds(this.lastData).subscribe(data => {
      data.docs.map(mdata => {
        this.allData.push(mdata.data());
      });
      const arrlast = data.docs[data.docs.length - 1];
      this.lastData = arrlast;
    });
  }
}
