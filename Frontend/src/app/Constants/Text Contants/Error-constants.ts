export class ErrorConstants {
  emptyFields: string = 'All fields are mandatory!';
  unexpectedError: string = 'An unexpected error has occured! Please try again in a few minutes!'

  emailInvalid: string = 'Email format not supported!';
  phoneInvalid: string = 'Phone number format not supported!';
  passwordsMissmatch: string = `Passwords don't match`;
  passwordTooShort: string = 'Password should have at least 8 characters!';

  yearInvalid: string = 'Invalid first registration!';
  mileageInvalid: string = 'Invalid mileage!';
  cubicCapacityInvalid: string = 'Invalid cubic capacity!';
  powerInvalid: string = 'Invalid power!';
  priceInvalid: string = 'Invalid price!';
}