// // firebase.ts
// import admin, { ServiceAccount } from 'firebase-admin';
// import { FirebaseApp } from 'firebase-admin/app';
// import serviceAccount from './path-to-your-firebase-adminsdk.json';

// class FirebaseAdmin {
//   private static instance: FirebaseAdmin;
//   private app: FirebaseApp;

//   private constructor() {
//     this.app = admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount as ServiceAccount),
//       databaseURL: 'https://your-database-name.firebaseio.com'
//     });
//   }

//   public static getInstance(): FirebaseAdmin {
//     if (!FirebaseAdmin.instance) {
//       FirebaseAdmin.instance = new FirebaseAdmin();
//     }
//     return FirebaseAdmin.instance;
//   }

//   public getApp(): FirebaseApp {
//     return this.app;
//   }
// }

// export default FirebaseAdmin;
