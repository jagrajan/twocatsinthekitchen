import DataObject, { DataDefinition } from 'models/database/DatabaseObject';
import { compare, hash } from 'bcrypt';
import config from 'config';
import prisma from 'db/prisma';

export type UserDefinition = DataDefinition & {
  email: string;
  password: string;
  avatar?: string;
  name?: string;
};

class User<D extends UserDefinition = UserDefinition> extends DataObject<D> {
  constructor(values: D) {
    super(values, 'cookbook.profile');
  }

  public async isAdmin(): Promise<boolean> {
    const result = await this.client.query(`
      SELECT 1 FROM cookbook.admin WHERE user_id = $1 AND expire_on > NOW();`,
      [this.values.id]
    );
    return result.rowCount > 0;
  }

  public async isMasterAdmin(): Promise<boolean> {
    const result = await this.client.query(`
      SELECT 1 FROM cookbook.admin
      WHERE user_id = $1 AND expire_on > NOW() AND master = TRUE;`,
      [this.values.id]
    );
    return result.rowCount > 0;
  }

  public async saveAdmin(master: boolean): Promise<boolean> {
    if (await this.isAdmin()) {
      return false;
    }
    const result = await this.client.query(`
      INSERT INTO cookbook.admin(user_id, expire_on, master)
      VALUES($1, NOW() + '1 year'::INTERVAL, $2)
      RETURNING *
    `, [this.values.id, master]);
    return result.rowCount > 0;
  }

  public async hashPassword(): Promise<void> {
    this.values.password =
      await hash(this.values.password, config.auth.bcryptSaltRounds);
  }

  public comparePassword(rawPassword: string): Promise<boolean> {
    return compare(rawPassword, this.values.password);
  }
}

  export async function isAdmin(id: string) {
    const admins = await prisma.admin.findMany({
      where: {
        expire_on: {
          gte: new Date(),
        },
      },
    });
    return admins.length > 0;
  }

export async function comparePassword(raw: string, hashed: string) {
  return compare(raw, hashed);
}

export default User;
