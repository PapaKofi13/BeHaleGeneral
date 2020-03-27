import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public activeRoute;
  constructor(private router: Router) { }

  ngOnInit() {
    this.activeRoute = this.router.url;
    
  }

}
