import DataFetcher from 'models/database/DataFetcher';
import RecipeNote, { RecipeNoteDefinition } from './RecipeNote';
import RecipeVersion from './RecipeVersion';

class RecipeNoteFetcher extends DataFetcher<RecipeNoteDefinition, RecipeNote> {
  constructor() {
    super('cookbook.recipe_note');
  }

  public async getById(id: string | number): Promise<RecipeNote | null> {
    const noteData = await this.getDataById(id);
    if (noteData) {
      return new RecipeNote(noteData);
    }
    return null;
  }

  public async getNotesForRecipeVersion(recipe: RecipeVersion): Promise<RecipeNote[] | null> {
    const result = await this.getDataByFieldsEqual({
      recipe_version_id: recipe.dataValues.id,
      global: false,
    });
    if (result !== null) {
      return result.map(data => new RecipeNote(data));
    }
    return null;
  }
}

export default RecipeNoteFetcher;
