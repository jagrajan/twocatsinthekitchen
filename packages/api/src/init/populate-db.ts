import { hashPassword, makeAdmin } from 'models/users/User';
import prisma from 'db/prisma';

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
  cookTime: string;
  prepTime: string;
  servings: number;
  introduction: string;
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
    cookTime: '20 minutes',
    prepTime: '30 minutes',
    servings: 3,
    image_file: 'some-test-food.jpg',
    introduction: '## A heading of some sort',
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

const populate = async () => {
  console.log('Creating users...');
  const jag = await prisma.profile.create({
    data: {
      email: 'jag@jagrajan.com',
      password: await hashPassword('password'),
      name: 'Jag',
    }
  });
  console.log('Making admins...');
  await makeAdmin(jag, true);


  console.log('Creating units...');
  for (let i = 0; i < UNITS.length; i++) {
    const [name, plural] = UNITS[i];
    const unit = await prisma.unit.create({
      data: { name, plural }
    });
    console.log(`${unit.name} has been added!`);
  }

  console.log('Creating ingredients...');
  for (let i = 0; i < INGREDIENTS.length; i++) {
    const [name, plural] = INGREDIENTS[i];
    const ing = await prisma.ingredient.create({
      data: { name, plural }
    });
    console.log(`${ing.name} has been added!`);
  }

  for (let i = 0; i < recipes.length; i++ ) {
    const rec = recipes[i];
    const recipe = await prisma.recipe.create({ data: { } });
    const dRecipeVersion = await prisma.recipe_version.create({
      data: {
        name: rec.name,
        description: rec.description,
        image_file: rec.image_file,
        cook_time: rec.cookTime,
        prep_time: rec.prepTime,
        serves: rec.servings,
        introduction: rec.introduction,
        version: 1,
        slug: rec.slug,
        recipe: { connect: { id: recipe.id} },
      },
    });
    await prisma.recipe_release.create({
      data: {
        recipe: {
          connect: { id: recipe.id }
        },
        recipe_version_recipe_release_latest_versionTorecipe_version: {
          connect: { id: dRecipeVersion.id },
        },
        recipe_version_recipe_release_released_versionTorecipe_version: {
          connect: { id: dRecipeVersion.id },
        },
      }
    });

    const { steps } = recipes[i];
    // Add steps for recipe
    for (let j = 0; j < steps.length; j++) {
      await prisma.recipe_step.create({
        data: {
          description: steps[j],
          position: j,
          recipe_version: { connect: { id: dRecipeVersion.id } },
        }
      });
      console.log(`Saving step ${j+1}: ${steps[j]}`);
    } // end for steps

    const { ingredients } = recipes[i];
    for (let j = 0; j < ingredients.length; j++) {
      const [u, i, minAmount, maxAmount] = ingredients[j];
      const dUnit = await prisma.unit.findOne({ where: { name: u } });
      const dIngredient = await prisma.ingredient.findOne({ where: { name: i } });
      if (dUnit && dIngredient) {
        await prisma.measured_ingredient.create({
          data: {
            recipe_version: { connect: { id: dRecipeVersion.id } },
            unit: { connect: { id: dUnit.id } },
            ingredient: { connect: { id: dIngredient.id } },
            min_amount: minAmount,
            max_amount: maxAmount,
            position: j,
          }
        });
        console.log(`Saving ingredient ${j + 1}:  ${minAmount} - ${maxAmount} ${dUnit.name !== '' && `X ${dUnit.name}`} of ${dIngredient.name}`);
      }
    }

    const { notes } = recipes[i];
    for (let j = 0; j < notes.length; j++) {
      const note = await prisma.recipe_note.create({
        data: {
          recipe_version: { connect: { id: dRecipeVersion.id } },
          global: true,
          position: j,
          text: notes[j],
        }
      });
      console.log(`Saving recipe note ${j+1}: ${note.text}`);
    }

  }

};

populate().then(() => 'database populated').catch(err => console.error(err)).finally(() => 'done nonetheless');
