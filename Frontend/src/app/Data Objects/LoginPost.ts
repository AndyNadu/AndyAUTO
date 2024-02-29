import { HttpClient } from "@angular/common/http";

export class LoginPost {

  // variables
  buttonSubmitted: boolean = false;
  invalidCredentials: boolean = false;

  email!: string;
  password!: string;

  emailEmpty?: boolean;
  passwordEmpty?: boolean;

  // methods
  noEmptyInputs(): boolean {
    this.emailEmpty = this.email === undefined || this.email === '';
    this.passwordEmpty = this.email === undefined || this.email === '';

    return !(this.emailEmpty || this.passwordEmpty);
  }

  tryLogin(http: HttpClient): void {
    http.post('http://localhost:5113/account/searchIfUserExists', user)
      .subscribe(
        (res: any) => {
          this._componentInteractionService.setSubmitText('Successfully logged in!');
          this.switchForm('logged-in');
        },
        (err: any) => {
          if (err = 'Invalid credentials!') {
            this.loginPost.invalidCredentials = true;
          }
        }
      );
  }
}
