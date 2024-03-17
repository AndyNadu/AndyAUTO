// angular
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// primeNG components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-account-personal-information',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    InputTextModule
  ],
  templateUrl: './account-personal-information.component.html',
  styleUrl: './account-personal-information.component.css'
})
export class AccountPersonalInformationComponent {

  // members
  userDetailsForm: FormGroup;
  changeEmailForm: FormGroup;
  changePhoneForm: FormGroup;
  accountDetailsLoading: boolean = false;
  changeEmailLoading: boolean = false;
  changePhoneLoading: boolean = false;
  deleteAccountLoading: boolean = false;

  ngOnInit(): void {
    this.userDetailsForm.patchValue({
      lastName: 'Nadu',
      firstName: 'Andy',
      address: '',
      legalPerson: false
    });
  }

  // constructor
  constructor(private _formBuilder: FormBuilder) {
    this.userDetailsForm = this._formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      address: '',
      legalPerson: false
    });
    this.changeEmailForm = this._formBuilder.group({
      newEmail: ['', Validators.required],
      newEmailVerification: ['', Validators.required]
    });
    this.changePhoneForm = this._formBuilder.group({
      newPhone: ['', Validators.required],
      newPhoneVerification: ['', Validators.required]
    });
    
  }


  // methods
  submitAccountDetails(): void {
    this.accountDetailsLoading = true;

    setTimeout((): void => {
      this.accountDetailsLoading = false;
    }, 1000);
  }
  submitChangeEmail(): void {
    this.changeEmailLoading = true;

    setTimeout((): void => {
      this.changeEmailLoading = false;
    }, 1000);
  }
  submitChangePhone(): void {
    this.changePhoneLoading = true;

    setTimeout((): void => {
      this.changePhoneLoading = false;
    }, 1000);
  }
  deleteAccount(): void {
    this.deleteAccountLoading = true;

    setTimeout((): void => {
      this.deleteAccountLoading = false;
    }, 1000);
  }
}
