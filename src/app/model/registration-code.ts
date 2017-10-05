import * as firebase from 'firebase';
import { FirebaseModel, cleanFirebaseData } from './firebase-model';

export class RegistrationCode implements FirebaseModel {
  public id: string;
  public label: string;
  public createdAt: Date;
  public used: boolean;
  public registrationId: string;
  public usedAt: Date;
  public usedBy: string;

  constructor(data: any) {
    this.id = data.$key || data.id;
    this.label = data.label;
    this.used = data.used;
    this.registrationId = data.registrationId;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    this.usedAt = data.usedAt ? new Date(data.usedAt) : null;
    this.usedBy = data.usedBy;
  }

  toFirebase(): any {
    return cleanFirebaseData({
      label: this.label,
      createdAt: this.createdAt || firebase.database.ServerValue.TIMESTAMP,
      used: this.used,
      registrationId: this.registrationId,
      usedAt: this.usedAt,
      usedBy: this.usedBy,
    });
  }
}
