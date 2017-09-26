import { FirebaseModel } from './firebase-model';
import { Child } from './child';

export class Registration implements FirebaseModel {
  public id: string;
  public child: Child;
  public registeredAt: Date;

  constructor(data: any) {
    this.id = data.$key;
    this.child = new Child(data.child);
    this.registeredAt = new Date(data.registeredAt);
  }

  toFirebase(): any {
    return {
      child: this.child.toFirebase(),
      registeredAt: this.registeredAt,
    };
  }
}
