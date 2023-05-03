export class Passager {



private _idpassager:string;
  private _username: string;
  private _password: string;
  private _confirmedPassword: string;

  private _email:string;

  private _firstName:string;
  private _lastName:string;
  private _tel:string;

  get id(): string {
    return this._idpassager;
  }

  set id(value: string) {
    this._idpassager = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get confirmedPassword(): string {
    return this._confirmedPassword;
  }

  set confirmedPassword(value: string) {
    this._confirmedPassword = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get tel(): string {
    return this._tel;
  }

  set tel(value: string) {
    this._tel = value;
  }
}
