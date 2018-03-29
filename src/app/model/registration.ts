import { environment } from '../../environments/environment';
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

export class Payment extends Approval {
  type: string;

  constructor(data) {
    super(data);
    this.type = data.type;
  }

  toFirebase(): any {
    return {
      ...super.toFirebase(),
      type: this.type,
    };
  }
}

export type KuchenSelection = 'kuchen' | 'none' | 'geschwister';

export class Kuchen implements FirebaseModel {
  selection: KuchenSelection;
  date?: string;
  name?: string;

  constructor(data?: any) {
    this.selection = data ? data.selection : 'none';
    this.date = data.date;
    this.name = data.name;
  }

  toFirebase(): any {
    const val: any = { selection: this.selection };
    if (this.date) val.date = this.date;
    if (this.name) val.name = this.name;
    return val;
  }
}

export type UebernachtungType = 'uebernachtung' | 'fuehrung' | 'none';

export class Uebernachtung {
  type: UebernachtungType;
  tent: boolean;

  constructor(data: any) {
    this.type = data.type;
    this.tent = data.tent;
  }
}

export class Registration implements FirebaseModel {
  public id: string;
  public child: Child;
  public parent: Parent;
  public emergencyContact: EmergencyContact;
  public uebernachtung: Uebernachtung;
  public kuchen: Kuchen;
  public payment: Payment;
  public waiver: Approval;
  public registeredAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.child = new Child(data.child);
    this.parent = new Parent(data.parent);
    this.uebernachtung = new Uebernachtung(data.uebernachtung);
    this.kuchen = new Kuchen(data.kuchen);
    this.emergencyContact = new EmergencyContact(data.emergencyContact);
    this.payment = data.payment ? new Payment(data.payment) : null;
    this.waiver = data.waiver ? new Approval(data.waiver) : null;
    this.registeredAt = new Date(data.registeredAt);
  }

  get price(): Price {
    console.log('reg:', this);
    const elements: PriceElement[] = [{ label: 'Teilnahmebeitrag', price: environment.price.base }];

    if (this.child.nextChild) {
      elements.push({ label: 'Ermäßigung für Geschwisterkind', price: environment.price.sibling });
    }

    if (this.kuchen.selection === 'none' || this.kuchen.date === 'none') {
      elements.push({ label: 'Entfall Kuchenspende', price: environment.price.kuchen });
    }

    const totalPrice = elements.reduce((a, b) => (a += b.price), 0);
    return new Price(totalPrice, elements);
  }

  toFirebase(): any {
    return {
      child: this.child.toFirebase(),
      parent: this.parent.toFirebase(),
      emergencyContact: this.emergencyContact.toFirebase(),
      uebernachtung: this.uebernachtung,
      kuchen: this.kuchen.toFirebase(),
      payment: this.payment ? this.payment.toFirebase() : null,
      waiver: this.waiver ? this.waiver.toFirebase() : null,
      registeredAt: this.registeredAt,
      price: this.price.toFirebase(),
    };
  }
}
