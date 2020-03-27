import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  private uniSource = new BehaviorSubject('some data');
  private courseSourse = new BehaviorSubject('some data');
  public uniData = this.uniSource.asObservable();
  public courseData = this.courseSourse.asObservable();
  constructor() { }

  public changeUniData(data) {
    this.uniSource.next(data);
  }

  public changeCourseData(data) {
    this.courseSourse.next(data);
  }
}
