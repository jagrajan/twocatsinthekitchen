import DataFetcher from 'models/database/DataFetcher';
import RecipeStep, { RecipeStepDefinition } from './RecipeStep';
import RecipeVersion from './RecipeVersion';

class RecipeStepFetcher extends DataFetcher<RecipeStepDefinition, RecipeStep> {
  constructor() {
    super('cookbook.recipe_step');
  }

  public async getById(id: string | number): Promise<RecipeStep | null> {
    const stepData = await this.getDataById(id);
    if (stepData) {
      return new RecipeStep(stepData);
    }
    return null;
  }

  public async getStepsForRecipeVersion(recipe: RecipeVersion): Promise<RecipeStep[] | null> {
    const result = await this.getDataByFieldsEqual({
      'recipe_version_id': recipe.dataValues.id,
    });
    if (result !== null) {
      return result.map(data => new RecipeStep(data));
    }
    return null;
  }
}

export default RecipeStepFetcher;
