import { Client, Pool } from 'pg';
import pool from 'db';
import DatabaseObject, { DataDefinition } from './DatabaseObject';

export type QueryParameters = {
  orderBy?: string;
  columns: string[];
  limit?: string;
}

abstract class DataFetcher<D extends DataDefinition = DataDefinition, T extends DatabaseObject = DatabaseObject> {

  protected readonly client: Client | Pool;
  private readonly tableName: string;

  constructor(tableName: string) {
    this.client = pool;
    this.tableName = tableName;
  }

  public async getDataByFieldsEqual(
    filters: { [key: string]: any },
    params: QueryParameters = { columns: ['*'] }): Promise<D[] | null> {
    const where: Array<[string, any]> = Object.keys(filters).map((k, i) => [`${k} = $${i + 1}`, filters[k]]);
    return this.getDataByFields(
      where,
      params
    );
  }

  public async getDataByFields(
    filters: Array<[string, any]>,
    params: QueryParameters = { columns: ['*'] }): Promise<D[] | null> {
    const sql = `
      SELECT
        ${params.columns.join(', ')}
      FROM ${this.tableName}
      ${
        filters.length > 0 ?
        'WHERE (' + filters.map(i => i[0]).join(') AND (') + ')' :
        ''
      }
      ${params.orderBy ? `ORDER BY ${params.orderBy}` : ''}
      ${params.limit ? `LIMIT ${params.limit}` : ''}
    `;
    let values: any[] = [];
    filters.forEach(i => {
      if (i[1] !== null) {
        if (Array.isArray(i[1])) {
          values = values.concat(i[1]);
        } else {
          values.push(i[1]);
        }
      }
    });
    const result = await this.client.query<D>(sql, values);
    if (result.rowCount > 0) {
      return result.rows;
    }
    return null;
  }

  public async getDataById(id: string | number): Promise<D | null> {
    const sql = `
    SELECT * FROM ${this.tableName} WHERE id = $1
    `;
    const result = await this.client.query<D>(sql, [id]);
    if (result.rowCount != 1) {
      return null;
    }
    return result.rows[0];
  }

  public abstract async getById(id: string | number): Promise<T | null>;

}

export default DataFetcher;
