import { UiService } from './../../services/ui.service';
import { FuncService } from './../../services/func.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracer',
  templateUrl: './tracer.component.html',
  styleUrls: ['./tracer.component.scss']
})
export class TracerComponent implements OnInit {
  public userTraceEmail;
  public searchData = [];
  public logData = [];
  public selectUser;
  public emptyData = 'search';
  constructor(private funcService: FuncService, private uiService: UiService) { }

  ngOnInit(): void {
  }

  public searchUser() {
    this.searchData = [];
    this.logData = [];
    this.selectUser = '';
    this.emptyData = 'search';
    this.funcService.searchUser(this.userTraceEmail).subscribe(data => {
      data.docs.map(res => {
        this.searchData.push(res.data());
        if (this.searchData.length !== 0) {
          this.uiService.hideLoader();
          this.emptyData = 'data';
        }
      });
      if (data.empty === true) {
        this.uiService.hideLoader();
        this.emptyData = 'no-data';
      }
    });
  }

  public getUserLogs(fname, lname, trace) {
    this.selectUser = `${fname} ${lname}`;
    let mainArr = [];
    mainArr = trace;
    let sortArr = mainArr.reverse();
    sortArr.forEach(data => {
      this.funcService.getUserTrace(data.key).subscribe(mdata => {
        this.logData.push({ ...mdata.data(), date: data.createdAt });
        console.log(this.logData);
      })
    });
  }
}
