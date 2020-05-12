import DataFetcher from 'models/database/DataFetcher';
import Recipe, { RecipeDefinition } from './Recipe';

class RecipeFetcher extends DataFetcher<RecipeDefinition, Recipe> {
  constructor() {
    super('cookbook.recipe');
  }

  public async getById(id: string | number): Promise<Recipe | null> {
    const recipeData = await this.getDataById(id);
    if (recipeData) {
      return new Recipe(recipeData);
    }
    return null;
  }

  public async getRecentRecipes(limit: number, hidden: boolean = false)
    :Promise<Recipe[] | null> {
    let filters: Array<[string, any]> = [];
    if (!hidden) {
      filters.push(['hidden = false', null]);
    }
    const results = await this.getDataByFields(filters, {
      columns: ['*'],
      limit: limit.toString(),
      orderBy: 'last_update DESC'
    });
    if (results !== null) {
      return results.map(def => new Recipe(def));
    }
    return null;
  }
}

export default RecipeFetcher;
