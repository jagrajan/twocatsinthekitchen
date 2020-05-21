import User from 'models/users/User';
import Recipe from 'models/cookbook/Recipe';
import RecipeNote from 'models/cookbook/RecipeNote';
import RecipeStep from 'models/cookbook/RecipeStep';
import MeasuredIngredient from 'models/cookbook/MeasuredIngredient';
import Unit from 'models/cookbook/Unit';
import UnitFetcher from 'models/cookbook/UnitFetcher';
import Ingredient from 'models/cookbook/Ingredient';
import IngredientFetcher from 'models/cookbook/IngredientFetcher';

const UNITS: [string, string][] = [
  ['', ''],
  ['tsp', 'tsps'],
  ['tbsp', 'tbsp'],
  ['cup', 'cups'],
  ['clove', 'cloves'],
];

const INGREDIENTS: [string, string][] = [
  ['tomato', 'tomatoes'],
  ['apple', 'apples'],
  ['oregano', 'oregano'],
  ['pinto beans', 'pinto beans']
];

type MockRecipe = {
  slug: string;
  name: string;
  description: string;
  image_file: string;
  steps: string[];
  ingredients: [string, string, string, string][] //unit, ingredient, min amount, max amount
  notes: string[];
}

const recipes: MockRecipe[] = [
  {
    slug: 'test-recipe',
    name: 'Test Recipe',
    description: 'It is real food',
    image_file: 'some-test-food.jpg',
    steps: [
      'Cut the tomato',
      'Add the spices',
      'Cook the food',
      'Enjoy the food',
    ],
    ingredients: [
      ['', 'apple', '1', '1'],
      ['clove', 'pinto beans', '2', '5'],
    ],
    notes: [
      'Make sure not to burn',
      'You can subsitute x with y',
    ],
  }
];

const unitFetcher = new UnitFetcher();
const ingredientFetcher = new IngredientFetcher();

const populate = async () => {
  console.log('Creating users...');
  const user: User = new User({
    email: 'jag@jagrajan.com',
    password: 'password',
    name: 'Jag',
  });
  await user.hashPassword();

  console.log('Saving users...');
  await user.save();

  console.log('Creating units...');
  for (let i = 0; i < UNITS.length; i++) {
    const [name, plural] = UNITS[i];
    const unit = new Unit({
      name,
      plural,
    });
    await unit.save();
    console.log(`${unit.dataValues.name} has been added!`);
  }

  console.log('Creating ingredients...');
  for (let i = 0; i < INGREDIENTS.length; i++) {
    const [name, plural] = INGREDIENTS[i];
    const ing = new Ingredient({
      name,
      plural,
    });
    await ing.save();
    console.log(`${ing.dataValues.name} has been added!`);
  }

  console.log('Creating ingredients...');

  for (let i = 0; i < recipes.length; i++ ) {
    const rec = recipes[i];
    console.log(`Creating recipe ${rec.name}`);
    const recipe: Recipe = new Recipe({
      slug: rec.slug
    });
    recipe.updateValues({
      released_version: 1
    });

    console.log('Saving recipe...');
    await recipe.save();

    console.log('Creating recipe version...');
    const version = recipe.createNewVersion();
    if (version != null) {
      version.updateValues({
        name: rec.name,
        description: rec.description,
        image_file: rec.image_file
      });
      await version.save();
      await recipe.incrementVersionAndSave();

      const { steps } = recipes[i];
      const versionId = recipe.dataValues.id;
      const recipeId = recipe.dataValues.id;
      if (versionId !== undefined && recipeId !== undefined) {

        // Add steps for recipe
        for (let j = 0; j < steps.length; j++) {
          const step = new RecipeStep({
            recipe_version_id: versionId,
            position: j+1,
            description: steps[j],
          });
          await step.save();
          console.log(`Saving step ${j+1}: ${steps[j]}`);
        } // end for steps

        // Add measured ingredients for recipe
        const ings = rec.ingredients;
        for (let j = 0; j < ings.length; j++) {
          const [unit, ing, minAmount, maxAmount] = ings[j];
          const resIng = await ingredientFetcher.getDataByFieldsEqual({ name: ing });
          const resUnit = await unitFetcher.getDataByFieldsEqual({ name: unit });

          if (resIng !== null && resUnit !== null && resIng[0].id !== null && resUnit[0].id !== null) {
            const measuredIngredient = new MeasuredIngredient({
              recipe_version_id: versionId,
              ingredient_id: <number>resIng[0].id,
              unit_id: <number>resUnit[0].id,
              min_amount: minAmount,
              max_amount: maxAmount,
              position: j+1
            });
            await measuredIngredient.save();
            console.log(`Saving ingredient ${j + 1}:  ${minAmount} - ${maxAmount} ${unit !== '' && `X ${unit}`} of ${ing}`);
          }
        } // end for ingredients

        for (let j = 0; j < rec.notes.length; j++) {
          const note = new RecipeNote({
            recipe_id: recipeId,
            recipe_version_id: versionId,
            global: true,
            position: j + 1,
            text: rec.notes[j],
          });
          await note.save();
          console.log(`Saving recipe note ${j+1}: ${note.dataValues.text}`);
        }

      }
    }
  }

};

populate().finally(() => console.log('all done'));
