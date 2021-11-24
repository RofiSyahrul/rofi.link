import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, browserLocalPersistence, initializeAuth } from 'firebase/auth';

const projectId = process.env.F_PROJECT_ID;

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.F_API_KEY,
  appId: process.env.F_APP_ID,
  authDomain: `${projectId}.firebaseapp.com`,
  messagingSenderId: process.env.F_MESSAGING_SENDER_ID,
  projectId,
  storageBucket: `${projectId}.appspot.com`
};

let app: FirebaseApp;

export class FirebaseClient {
  protected static _instance: FirebaseClient;

  protected _auth: Auth;

  constructor() {
    if (!app) {
      app = initializeApp(firebaseConfig, APP_NAME);
    }

    this._auth = initializeAuth(app, {
      persistence: browserLocalPersistence,
      popupRedirectResolver: undefined
    });
  }

  private static get instance(): FirebaseClient {
    if (FirebaseClient._instance) {
      return FirebaseClient._instance;
    }

    const instance = new FirebaseClient();
    FirebaseClient._instance = instance;
    return instance;
  }

  static get auth(): Auth {
    return FirebaseClient.instance._auth;
  }
}
