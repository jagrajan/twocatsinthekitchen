import DataObject, { DataDefinition } from 'models/database/DatabaseObject';
export type RecipeStepDefinition = DataDefinition & {
  recipe_version_id: number;
  position: number;
  description: string;
}

class RecipeStep extends DataObject<RecipeStepDefinition> {
  constructor(values: RecipeStepDefinition) {
    super(values, 'cookbook.recipe_step');
  }
}

export default RecipeStep;
