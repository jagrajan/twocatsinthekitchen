import DataFetcher from 'models/database/DataFetcher';
import Ingredient, { IngredientDefinition } from './Ingredient';

class IngredientFetcher extends DataFetcher<IngredientDefinition, Ingredient> {
  constructor() {
    super('cookbook.ingredient');
  }

  public async getById(id: string | number): Promise<Ingredient | null> {
    const ingredientData = await this.getDataById(id);
    if (ingredientData) {
      return new Ingredient(ingredientData);
    }
    return null;
  }
}

export default IngredientFetcher;
