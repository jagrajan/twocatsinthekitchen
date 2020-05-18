import DataObject, { DataDefinition } from 'models/database/DatabaseObject';
import { sign, verify } from 'jsonwebtoken';
import config from 'config';

export type AuthKeyDefinition = DataDefinition & {
  user_id: string,
  expire_on: Date,
  admin: boolean,
};

class AuthKey extends DataObject<AuthKeyDefinition> {
  constructor(values: AuthKeyDefinition) {
    super(values, 'users.auth_key');
  }

  public createSignedJWT(): string {
    return sign(this.values, config.auth.jwtKey, {
      expiresIn: '30 days'
    });
  }

  public static parse(jwt: string): AuthKey {
    console.log(jwt);
    const data = <AuthKeyDefinition>verify(jwt, config.auth.jwtKey);
    return new AuthKey(data);
  }
}

export default AuthKey;
