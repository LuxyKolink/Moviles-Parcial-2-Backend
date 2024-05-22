import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

export default class FirebaseAdmin {
private static instance: FirebaseAdmin;

  private constructor() {
    admin.initializeApp({
      credential: applicationDefault(),
      projectId: 'parcial-3-parte2'
    });
  }

  static getInstance = (): FirebaseAdmin => {
    if (!FirebaseAdmin.instance) {
      FirebaseAdmin.instance = new FirebaseAdmin();
    }
    return FirebaseAdmin.instance;
  }
}


// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Projects\Parcial-final\Moviles-Parcial-2-Backend\config\parcial-3-parte2-firebase-adminsdk-g9tgu-f27ddf6f85.json"

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

