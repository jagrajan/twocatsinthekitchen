import DataObject, { DataDefinition } from 'models/database/DatabaseObject';
import { compare, hash } from 'bcrypt';
import config from 'config';

export type UserDefinition = DataDefinition & {
  email: string;
  password: string;
  avatar?: string;
  name?: string;
};

class User<D extends UserDefinition = UserDefinition> extends DataObject<D> {
  constructor(values: D) {
    super(values, 'users.profile');
  }

  public async hashPassword(): Promise<void> {
    this.values.password =
      await hash(this.values.password, config.auth.bcryptSaltRounds);
  }

  public comparePassword(rawPassword: string): Promise<boolean> {
    return compare(rawPassword, this.values.password);
  }
}

export default User;
