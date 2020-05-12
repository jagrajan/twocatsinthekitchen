import User from 'models/users/User';
import Recipe from 'models/cookbook/Recipe';
import RecipeVersion from 'models/cookbook/RecipeVersion';

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
