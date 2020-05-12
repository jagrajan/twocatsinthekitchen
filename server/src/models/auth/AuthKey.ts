import DataObject, { DataDefinition } from 'models/database/DatabaseObject';
import { sign } from 'jsonwebtoken';
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
}

export default AuthKey;
