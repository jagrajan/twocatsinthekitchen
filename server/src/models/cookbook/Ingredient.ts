import DataObject, { DataDefinition } from 'models/database/DatabaseObject';

export type IngredientDefinition = DataDefinition & {
  name: string;
  plural?: string;
  unit?: number;
  category?: number;
}

class Ingredient extends DataObject<IngredientDefinition> {
  constructor(values: IngredientDefinition) {
    super(values, 'cookbook.ingredient');
  }
}

export default Ingredient;

