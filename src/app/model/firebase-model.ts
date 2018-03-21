export interface FirebaseModel {
  toFirebase(): any;
}

export function cleanFirebaseData(obj: any): any {
  Object.keys(obj)
    .filter(key => typeof obj[key] === 'undefined')
    .forEach(key => delete obj[key]);
  return obj;
}
