import { FuncService } from './../../services/func.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public reportsData = [];
  public selectReport;
  public adminCountry;
  public activeId;
  public lastData: any;
  constructor(private funcService: FuncService) { }

  ngOnInit(): void {
    this.getReports();
    this.adminCountry = localStorage.getItem('bhAdminCountry');
  }

  public getReports() {
    this.reportsData = [];
    this.funcService.getReports().subscribe(data => {
      data.docs.map(res => {
        this.reportsData.push(res.data());
      });
      const arrlast = data.docs[data.docs.length - 1];
      this.lastData = arrlast;
    })
  }

  public getMoreReports() {
    this.funcService.getMoreReports(this.lastData).subscribe(data => {
      data.docs.map(mdata => {
        this.reportsData.push(mdata.data());
      });
      const arrlast = data.docs[data.docs.length - 1];
      this.lastData = arrlast;
    });
  }

  public activateReport(data, id) {
    this.selectReport = data;
    this.activeId = id
  }

  public changeStatus(key, status, id) {
    this.funcService.changeReportStatus(key, status);
    this.reportsData[id].status = status;
  }
}
