import { Client, Pool, QueryResult } from 'pg'
import pool from 'db';

export type DataDefinition = {
  id?: string | number;
}

class DatabaseObject<D extends DataDefinition = DataDefinition> {
  protected values: D;
  protected client: Client | Pool;
  private tableName: string;

  constructor(values: D, tableName: string) {
    this.values = values;
    this.tableName = tableName;
    this.client = pool;
  }

  public get dataValues(): D {
    return this.values;
  }

  public updateValues(values: D | {}): void {
    this.values = {
      ...this.values,
      ...values
    };
  }

  public async save(forceInsert: boolean = false): Promise<boolean> {
    let sql: string = '';
    let params: any[] = [];
    if (!this.values.id || forceInsert) {
      const filtered = Object.keys(this.values).filter(c => c !== 'id');
      const columns = filtered.join(', ');
      params = filtered.map(c => (this.values as any)[c]);
      sql = `
        INSERT INTO ${this.tableName}(${columns})
        VALUES (${params.map((v, i) => `$${i + 1}`).join(', ')})
        RETURNING *
      `;
    } else {
      const updates = Object.keys(this.values).map((c, i) => {
        return `${c} = $${i +1}`;
      }).join(', ');
      params = [...Object.values(this.values), this.values.id];
      sql = `
        UPDATE ${this.tableName} SET ${updates}
        WHERE id = $${params.length}
        RETURNING *
      `;
    }
    const result: QueryResult<D> = await this.client.query<D>(sql, params);
    if (result.rowCount == 1) {
      this.values = result.rows[0];
      return true;
    }
    return false;
  }
}

export default DatabaseObject;
