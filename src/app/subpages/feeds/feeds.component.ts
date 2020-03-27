import { UiService } from './../../services/ui.service';
import { FuncService } from './../../services/func.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  public newsGetData = [];
  public newCatAllData = [];
  public newsType = 'coronavirus';
  public newsCatType = 'coronavirus';
  constructor(private http: HttpClient, private funcService: FuncService, private uiService: UiService) { }

  ngOnInit(): void {
    this.getNewCategories(this.newsType);
    this.changeNews(this.newsCatType);
  }

  public getNewCategories(type) {
    this.newsGetData = [];
    this.newsType = type;
    this.http.get(`http://newsapi.org/v2/everything?q=${type}&sortBy=publishedAt&pageSize=100&apiKey=f12f9401282149dcbeeab2745d1cf958`).subscribe(data => {
      this.newsGetData = data['articles'];
    })
  }

  public changeNews(type) {
    let mainType = type;
    this.newsCatType = type;
    this.newCatAllData = [];
    this.funcService.getNewsFeed(mainType).subscribe(data => {
      this.newCatAllData = data
    });
  }

  public addFeed(data) {
    this.funcService.addNewFeed(data, this.newsType);
  }

  public deleteFeed(key) {
    this.funcService.deleteNewsFeed(key);
  }

}
