import { FuncService } from './../../services/func.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public activeRoute;
  public globalData;
  public dateTime;
  constructor(private router: Router, private funcService: FuncService) { }

  ngOnInit() {
    this.activeRoute = this.router.url;
    this.getGlobal();
  }

  public getGlobal() {
    this.funcService.getVAll().subscribe(data => {
      this.globalData =data;
    });
    this.funcService.getDate().subscribe(data => {
      let newDate = new Date(`${data['utc_datetime']}`).toDateString()
      this.dateTime =newDate;
    });
  }

}
