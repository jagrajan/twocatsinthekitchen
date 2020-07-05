import DataFetcher from 'models/database/DataFetcher';
import MeasuredIngredient, { MeasuredIngredientDefinition } from './MeasuredIngredient';
import RecipeVersion from './RecipeVersion';

class MeasuredIngredientFetcher extends DataFetcher<MeasuredIngredientDefinition, MeasuredIngredient> {
  constructor() {
    super('cookbook.measured_ingredient');
  }

  public async getById(id: string | number): Promise<MeasuredIngredient | null> {
    const ingredientData = await this.getDataById(id);
    if (ingredientData) {
      return new MeasuredIngredient(ingredientData);
    }
    return null;
  }

  public async getIngredientsForRecipeVersion(recipe: RecipeVersion): Promise<MeasuredIngredient[] | null> {
    const result = await this.getDataByFieldsEqual({
      'recipe_version_id': recipe.dataValues.id,
    });
    if (result !== null) {
      return result.map(data => new MeasuredIngredient(data));
    }
    return null;
  }
}

export default MeasuredIngredientFetcher;
