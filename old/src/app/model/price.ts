import { FirebaseModel } from './firebase-model';

export interface PriceElement {
  label: string;
  price: number;
}

export class Price implements FirebaseModel {
  constructor(public total: number, public elements: PriceElement[]) {}

  toFirebase(): any {
    return this;
  }
}
