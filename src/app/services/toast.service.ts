import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastr: ToastrService) {}
  public mainSuccess(msg) {
    this.toastr.success(`${msg}`);
  }
  public mainError(e) {
    this.toastr.error('An Error Occured', `${e}`);
  }
}
