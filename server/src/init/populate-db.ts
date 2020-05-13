import User from 'models/users/User';
import Recipe from 'models/cookbook/Recipe';
import Unit from 'models/cookbook/Unit';
import Ingredient from 'models/cookbook/Ingredient';

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
}

const recipes: MockRecipe[] = [
  {
    slug: 'test-recipe',
    name: 'Test Recipe',
    description: 'It is real food',
    image_file: 'some-test-food.jpg'
  }
];

const populate = async () => {
  console.log('Creating users...');
  const user: User = new User({
    email: 'jag@jagrajan.com',
    password: 'password'
  });
  await user.hashPassword();

  console.log('Saving users...');
  await user.save();

  console.log('Creating units...');
  for (let i = 0; i < UNITS.length; i++) {
    const unit = new Unit({
      name: UNITS[i][0],
      plural: UNITS[i][1]
    });
    await unit.save();
    console.log(`${unit.dataValues.name} has been added!`);
  }

  console.log('Creating ingredients...');
  for (let i = 0; i < INGREDIENTS.length; i++) {
    const ing = new Ingredient({
      name: INGREDIENTS[i][0],
      plural: INGREDIENTS[i][1]
    });
    await ing.save();
    console.log(`${ing.dataValues.name} has been added!`);
  }

  console.log('Creating ingredients...');

  for (let i = 0; i < recipes.length; i++ ) {
    const res = recipes[i];
    console.log(`Creating recipe ${res.name}`);
    const recipe: Recipe = new Recipe({
      slug: res.slug
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
        name: res.name,
        description: res.description,
        image_file: res.image_file
      });
      await version.save();
      await recipe.incrementVersionAndSave();
    }
  }

};

populate().finally(() => console.log('all done'));
