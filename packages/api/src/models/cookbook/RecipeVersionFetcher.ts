import DataFetcher from 'models/database/DataFetcher';
import RecipeVersion, { RecipeVersionDefinition } from './RecipeVersion';
import Recipe, { RecipeDefinition } from './Recipe';

class RecipeVersionFetcher extends DataFetcher<RecipeVersionDefinition, RecipeVersion> {
  constructor() {
    super('cookbook.recipe_version');
  }

  public async getById(id: string | number): Promise<RecipeVersion | null> {
    const versionData = await this.getDataById(id);
    if (versionData) {
      return new RecipeVersion(versionData);
    }
    return null;
  }

  public async getReleasedVersion(recipe: Recipe): Promise<RecipeVersion | null> {
    const result = await this.getDataByFieldsEqual({
      'recipe_id': recipe.dataValues.id,
      'version': recipe.dataValues.released_version
    });
    if (result !== null) {
      return new RecipeVersion(result[0]);
    }
    return null;
  }
}

export default RecipeVersionFetcher;
