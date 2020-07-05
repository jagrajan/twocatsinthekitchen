import DataObject, { DataDefinition } from 'models/database/DatabaseObject';
export type RecipeNoteDefinition = DataDefinition & {
  recipe_version_id?: number;
  recipe_id: number;
  user_id?: string;
  global: boolean;
  position: number;
  text: string;
}

class RecipeNote extends DataObject<RecipeNoteDefinition> {
  constructor(values: RecipeNoteDefinition) {
    super(values, 'cookbook.recipe_note');
  }
}

export default RecipeNote;
