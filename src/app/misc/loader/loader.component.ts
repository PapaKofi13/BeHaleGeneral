import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public loaderBool = 'false';
  constructor(private uiService: UiService) { }

  ngOnInit() {
    this.uiService.currentState.subscribe(data => {
      this.loaderBool = data;
      console.log(data);
    })
  }
}
