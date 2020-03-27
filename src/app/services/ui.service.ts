import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public loadSource = new BehaviorSubject('false');
  currentState = this.loadSource.asObservable();

  constructor(private toastService: ToastrService, private router: Router) { }

  public showError(msg) {
    this.toastService.error(`${msg}`)
  }

  public showSuccess(msg) {
    this.toastService.success(`${msg}`)
  }
  public showWarning(msg) {
    this.toastService.warning(`${msg}`)
  }

  public showLoader() {
    this.changeState('true');
  }

  public hideLoader() {
    this.changeState('false');
  }

  public goToRoute(path) {
    return this.router.navigateByUrl(`/${path}`);
  }

  public changeState(state) {
    this.loadSource.next(state);
  }
}
