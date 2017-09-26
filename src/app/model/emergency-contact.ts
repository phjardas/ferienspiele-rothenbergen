import { FirebaseModel } from './firebase-model';

export class EmergencyContact implements FirebaseModel {
  public name: string;
  public phone: string;

  constructor(data: any) {
    this.name = data.name;
    this.phone = data.phone;
  }

  toFirebase(): any {
    return this;
  }
}
