import { Injectable } from '@angular/core';

declare var toastr: any;

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() { }

  Success(title: String, message?: String) {
    toastr.success(title, message);
  }

  Warning(title: String, message?: String) {
    toastr.warning(title, message);
  }

  Error(title: String, message?: String) {
    toastr.error(title, message);
  }

  Info(message: String) {
    toastr.info(message);
  }
}
