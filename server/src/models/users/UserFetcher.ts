import DataFetcher from 'models/database/DataFetcher';
import User, { UserDefinition } from './User';

class UserFetcher extends DataFetcher<UserDefinition, User> {

  constructor() {
    super('users.profile');
  }

  public async getById(id: string | number): Promise<User | null> {
    const userData = await this.getDataById(id);
    if (userData) {
      return new User(userData);
    }
    return null;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const userData = await this.getDataByFieldsEqual({ email });
    if (userData != null) {
      return new User(userData[0]);
    }
    return null;
  }
}

export default UserFetcher;
