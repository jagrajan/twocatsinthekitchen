import DataObject, { DataDefinition } from 'models/database/DatabaseObject';
import { sign, verify } from 'jsonwebtoken';
import { auth_key } from '@prisma/client';
import config from 'config';

export type AuthKeyDefinition = DataDefinition & {
  user_id: string,
  expire_on: Date,
  admin: boolean,
};

class AuthKey extends DataObject<AuthKeyDefinition> {
  constructor(values: AuthKeyDefinition) {
    super(values, 'cookbook.auth_key');
  }

  public createSignedJWT(): string {
    return sign(this.values, config.auth.jwtKey, {
      expiresIn: '30 days'
    });
  }

  public static parse(jwt: string): AuthKey {
    const data = <AuthKeyDefinition>verify(jwt, config.auth.jwtKey);
    return new AuthKey(data);
  }
}

export async function createJWT(authKey: auth_key) {
  return sign(authKey, config.auth.jwtKey, {
    expiresIn: '30 days'
  });
}

export async function parseJWT(jwt: string) {
  return <auth_key>verify(jwt, config.auth.jwtKey);
}

export default AuthKey;
