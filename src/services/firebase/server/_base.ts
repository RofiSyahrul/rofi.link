import path from 'path';

import admin from 'firebase-admin';
import { Auth } from 'firebase-admin/lib/auth/auth';
import { Database } from 'firebase-admin/lib/database/database';

import serverConfig from '@/server-config';

const serviceAccountPath = path.resolve(process.cwd(), 'serviceAccount.json');

export class FirebaseAdmin {
  protected static _instance: FirebaseAdmin;

  protected _auth: Auth;

  protected _db: Database;

  constructor() {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
        databaseURL: serverConfig.dbURL
      });
    }

    this._auth = admin.auth();
    this._db = admin.database();
  }

  private static get instance(): FirebaseAdmin {
    if (FirebaseAdmin._instance) {
      return FirebaseAdmin._instance;
    }

    const instance = new FirebaseAdmin();
    FirebaseAdmin._instance = instance;
    return instance;
  }

  static get auth(): Auth {
    return FirebaseAdmin.instance._auth;
  }

  static get db(): Database {
    return FirebaseAdmin.instance._db;
  }
}
