import { FirebaseModel } from './firebase-model';
import { Child } from './child';
import { EmergencyContact } from './emergency-contact';
import { Parent } from './parent';
import { Price, PriceElement } from './price';


export class Approval implements FirebaseModel {
  timestamp: Date;
  user: string;

  constructor(data) {
    this.timestamp = new Date(data.timestamp);
    this.user = data.user;
  }

  toFirebase(): any {
    return {
      timestamp: this.timestamp.getDate(),
      user: this.user,
    };
  }
}


export class Registration implements FirebaseModel {
  public id: string;
  public child: Child;
  public parent: Parent;
  public emergencyContact: EmergencyContact;
  public payment: Approval;
  public waiver: Approval;
  public registeredAt: Date;

  constructor(data: any) {
    this.id = data.$key;
    this.child = new Child(data.child);
    this.parent = new Parent(data.parent);
    this.emergencyContact = new EmergencyContact(data.emergencyContact);
    this.payment = data.payment ? new Approval(data.payment) : null;
    this.waiver = data.waiver ? new Approval(data.waiver) : null;
    this.registeredAt = new Date(data.registeredAt);
  }

  get price(): Price {
    const elements: PriceElement[] = [{ label: 'Teilnahmebeitrag', price: 30 }];
    if (this.child.nextChild) elements.push({ label: 'Ermäßigung für Geschwisterkind', price: -5 });
    const totalPrice = elements.reduce((a, b) => a += b.price, 0);
    return new Price(totalPrice, elements);
  }

  toFirebase(): any {
    return {
      child: this.child.toFirebase(),
      parent: this.parent.toFirebase(),
      emergencyContact: this.emergencyContact.toFirebase(),
      payment: this.payment ? this.payment.toFirebase() : null,
      waiver: this.waiver ? this.waiver.toFirebase() : null,
      registeredAt: this.registeredAt,
    };
  }
}
