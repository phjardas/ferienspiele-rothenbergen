import { FirebaseModel } from './firebase-model';

export class Parent implements FirebaseModel {
  public phone: string;
  public email: string;
  public street: string;
  public zip: string;
  public city: string;

  constructor(data: any) {
    this.phone = data.phone;
    this.email = data.email;
    this.street = data.street;
    this.zip = data.zip;
    this.city = data.city;
  }

  toFirebase(): any {
    return this;
  }
}
