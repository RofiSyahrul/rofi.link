import type { Auth } from 'firebase-admin/lib/auth/auth';

import { FirebaseAdmin } from './_base';

class FirebaseServerAuth {
  protected _auth: Auth;

  constructor() {
    this._auth = FirebaseAdmin.auth;
  }

  protected parseBearerAuth(bearerAuth: string): string {
    return bearerAuth.split('Bearer ')[1] ?? '';
  }

  async decode(bearerAuth: string) {
    const idToken = this.parseBearerAuth(bearerAuth);
    const decoded = await this._auth.verifyIdToken(idToken);
    return decoded;
  }
}

export const serverAuth = new FirebaseServerAuth();
