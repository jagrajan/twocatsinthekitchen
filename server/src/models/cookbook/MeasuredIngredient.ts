import DataObject, { DataDefinition } from 'models/database/DatabaseObject';
export type MeasuredIngredientDefinition = DataDefinition & {
  recipe_version_id: number;
  ingredient_id: number;
  unit_id: number,
  min_amount: string;
  max_amount: string;
  position: number;
}

class MeasuredIngredient extends DataObject<MeasuredIngredientDefinition> {
  constructor(values: MeasuredIngredientDefinition) {
    super(values, 'cookbook.measured_ingredient');
  }
}

export default MeasuredIngredient;
