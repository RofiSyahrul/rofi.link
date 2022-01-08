import type { Auth } from 'firebase/auth';
import { signInAnonymously } from 'firebase/auth';

import { FirebaseClient } from './_base';

class FirebaseClientAuth {
  protected _auth: Auth;

  constructor() {
    this._auth = FirebaseClient.auth;
  }

  get currentUser() {
    return this._auth.currentUser;
  }

  async getToken() {
    try {
      const idToken = await this.currentUser?.getIdToken();
      return idToken;
    } catch {
      return null;
    }
  }

  async signInAnonymously() {
    try {
      const { user } = await signInAnonymously(this._auth);
      return user;
    } catch {
      return null;
    }
  }
}

export const auth = new FirebaseClientAuth();
