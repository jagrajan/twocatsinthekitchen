import DataFetcher from 'models/database/DataFetcher';
import Unit, { UnitDefinition } from './Unit';

class UnitFetcher extends DataFetcher<UnitDefinition, Unit> {
  constructor() {
    super('cookbook.unit');
  }

  public async getById(id: string | number): Promise<Unit | null> {
    const unitData = await this.getDataById(id);
    if (unitData) {
      return new Unit(unitData);
    }
    return null;
  }
}

export default UnitFetcher;
