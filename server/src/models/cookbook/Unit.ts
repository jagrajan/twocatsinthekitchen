import DataObject, { DataDefinition } from 'models/database/DatabaseObject';

export type UnitDefinition = DataDefinition & {
  name: string;
  plural: string;
}

class Unit extends DataObject<UnitDefinition> {
  constructor(values: UnitDefinition) {
    super(values, 'cookbook.unit');
  }
}

export default Unit;

