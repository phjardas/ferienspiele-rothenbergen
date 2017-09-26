import { FirebaseModel } from './firebase-model';
import { Child } from './child';
import { Parent } from './parent';

export class Registration implements FirebaseModel {
  public id: string;
  public child: Child;
  public parent: Parent;
  public registeredAt: Date;

  constructor(data: any) {
    this.id = data.$key;
    this.child = new Child(data.child);
    this.parent = new Parent(data.parent);
    this.registeredAt = new Date(data.registeredAt);
  }

  toFirebase(): any {
    return {
      child: this.child.toFirebase(),
      parent: this.parent.toFirebase(),
      registeredAt: this.registeredAt,
    };
  }
}
