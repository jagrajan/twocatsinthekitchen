import DataObject, { DataDefinition } from 'models/database/DatabaseObject';

export type RecipeVersionDefinition = DataDefinition & {
  id?: number,
  name?: string,
  name_tokens?: string,
  description?: string,
  introduction?: string,
  compiled_introduction?: string,
  image_file?: string,
  cook_time?: string,
  prep_time?: string,
  serves?: number,
  recipe_id: number,
  version: number,
}

class RecipeVersion extends DataObject<RecipeVersionDefinition> {
  constructor(values: RecipeVersionDefinition) {
    super(values, 'cookbook.recipe_version');
  }
}

export default RecipeVersion;
