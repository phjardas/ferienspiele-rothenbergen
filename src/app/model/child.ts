import { FirebaseModel } from './firebase-model';
import { ShirtSize } from './shirt-size';

export class Child implements FirebaseModel {
  public firstName: string;
  public lastName: string;
  public dateOfBirth: string;
  public gender: string;
  public shirtSize: ShirtSize;

  constructor(data: any) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dateOfBirth = data.dateOfBirth;
    this.gender = data.gender;
    this.shirtSize = ShirtSize.valueOf(data.shirtSize);
  }

  toFirebase(): any {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      shirtSize: this.shirtSize.id,
    };
  }
}
