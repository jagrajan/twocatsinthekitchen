import DataObject, { DataDefinition } from 'models/database/DatabaseObject';
import RecipeVersion from './RecipeVersion';

export type RecipeDefinition = DataDefinition & {
  id?: number,
  released_version?: number,
  latest_version?: number,
  hidden?: boolean,
  slug?: string,
}

class Recipe extends DataObject<RecipeDefinition> {
  constructor(values: RecipeDefinition) {
    super(values, 'cookbook.recipe');
  }

  public async incrementVersionAndSave(): Promise<boolean> {
    if (this.values.latest_version != null) {
      this.values.latest_version = this.values.latest_version + 1;
      return this.save();
    }
    return false;
  }

  public createNewVersion(): RecipeVersion | null {
    if (this.values.id != null &&
      this.values.latest_version != null) {
      return new RecipeVersion({
        recipe_id: this.values.id,
        version: this.values.latest_version + 1
      });
    }
    return null;
  }
}

export default Recipe;
