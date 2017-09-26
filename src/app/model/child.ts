import { FirebaseModel } from './firebase-model';
import { Gender } from './gender';
import { ShirtSize } from './shirt-size';

export class Child implements FirebaseModel {
  public firstName: string;
  public lastName: string;
  public dateOfBirth: string;
  public gender: Gender;
  public shirtSize: ShirtSize;
  public miscellaneous: string;
  public vegetarian: boolean;
  public nextChild: boolean;

  constructor(data: any) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dateOfBirth = data.dateOfBirth;
    this.gender = Gender.valueOf(data.gender);
    this.shirtSize = ShirtSize.valueOf(data.shirtSize);
    this.vegetarian = data.vegetarian;
    this.nextChild = data.nextChild;
  }

  toFirebase(): any {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender.id,
      shirtSize: this.shirtSize.id,
      vegetarian: this.vegetarian,
      nextChild: this.nextChild,
    };
  }
}
