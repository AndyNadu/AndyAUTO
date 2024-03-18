import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  markAsDirty(_form: FormGroup): boolean {
    let dirtyFields: boolean = false;

    Object.keys(_form.controls).forEach(key => {
      const control = _form.get(key);

      if (control) {
        dirtyFields = true;
        control.markAsDirty();
      }
    });

    return dirtyFields;
  }
}
