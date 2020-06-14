import { Request, Response } from 'express';
import client from 'db';
import prisma from 'db/prisma';
import Recipe from 'models/cookbook/Recipe';
import RecipeFetcher from 'models/cookbook/RecipeFetcher';
import RecipeVersionFetcher from 'models/cookbook/RecipeVersionFetcher';
import { CreateRecipeBody } from 'types/requests';

export const getRecent = async (req: Request, res: Response): Promise<void> => {
  let limit = 10;
  if (req.query.limit) {
    limit = parseInt(req.query.limit.toString());
  }
  const recipes = await prisma.recipe_release.findMany({
    include: {
      recipe_version_recipe_release_released_versionTorecipe_version: true,
    },
    orderBy: {
      released_version: 'desc',
    },
    take: limit,
    where: {
      NOT: {
        released_version: null,
      },
    },
  });
  res.json(recipes.map(x => x.recipe_version_recipe_release_released_versionTorecipe_version));
};

export const getDetails = async(req: Request, res: Response): Promise<void> => {
  let response: any = {};
  let input: string = req.params.id;
  let field: string = 'id';

  if (input && isNaN(input as any)) {
    field  = 'slug';
  }
  const recipeFetcher = new RecipeFetcher();
  const recipeData  = await recipeFetcher.getDataByFieldsEqual({ [field]: input });
  if (recipeData != null) {
    const recipeVersionFetcher = new RecipeVersionFetcher();
    const version = await recipeVersionFetcher
      .getReleasedVersion(new Recipe(recipeData[0]));
    if (version != null) {

      // Get ingredients for this recipe
      const ingRes = await client.query(`
        SELECT
          mi.min_amount,
          mi.max_amount,
          mi.position,
          u.name AS unit_name,
          u.plural AS unit_plural,
          i.name AS ingredient_name,
          i.plural AS ingredient_plural
        FROM cookbook.measured_ingredient mi
        INNER JOIN cookbook.ingredient i
          ON i.id = mi.ingredient_id
        INNER JOIN cookbook.unit u
          ON u.id = mi.unit_id
        WHERE mi.recipe_version_id = $1
      `, [version.dataValues.id]);

      // Get notes for this recipe
      const notesRes = await client.query(`
        SELECT
          rn.text,
          rn.position
        FROM cookbook.recipe_note rn
        WHERE rn.global = true AND rn.recipe_version_id = $1
      `, [version.dataValues.id]);

      // Get steps for thsi recipe
      const stepsRes = await client.query(`
        SELECT
          rs.description,
          rs.position
        FROM cookbook.recipe_step rs
        WHERE rs.recipe_version_id = $1
      `, [version.dataValues.id]);

      response.recipe = {
        metadata: recipeData[0],
        info: version?.dataValues,
        ingredients: ingRes.rows,
        notes: notesRes.rows,
        steps: stepsRes.rows,
      };
    }
  }

  if (!response.recipe) {
    response.error = 'No recipe found';
  }
  res.json(response);
};

export const getDashboard = async(req: Request, res: Response): Promise<void> => {
  const results = await prisma.recipe_release.findMany({
    include: {
      recipe_version_recipe_release_latest_versionTorecipe_version: true,
      recipe_version_recipe_release_released_versionTorecipe_version: true,
    }
  });

  res.json(
    results.map(x => ({
      released: x.recipe_version_recipe_release_released_versionTorecipe_version,
      latest: x.recipe_version_recipe_release_latest_versionTorecipe_version,
      recipe_id: x.recipe_id,
      create_date: x.create_date
    }))
  );
};

export const postIndex = async(req: Request, res: Response): Promise<void> => {
  const recipe = (req.body as CreateRecipeBody);
  const recipeVersion = await prisma.recipe_version.create({
    data: {
      name: recipe.name,
      description: recipe.description,
      slug: 'something',
      version: 1
    }
  });
  const { ingredients, steps, notes } = recipe;
  for (let j = 0; j < ingredients.length; j++) {
    await prisma.measured_ingredient.create({
      data: {
        recipe_version: { connect: { id: recipeVersion.id } },
        ingredient: { connect: { id: ingredients[j].ingredient } },
        unit: { connect: { id: ingredients[j].unit } },
        position: j,
        min_amount: ingredients[j].minAmount,
        max_amount: ingredients[j].maxAmount,
      }
    });
  }
  for (let j = 0; j < steps.length; j++) {
    await prisma.recipe_step.create({
      data: {
        recipe_version: { connect: { id: recipeVersion.id } },
        position: j,
        description: steps[j]
      }
    });
  }
  for (let j = 0; j < notes.length; j++) {
    await prisma.recipe_note.create({
      data: {
        recipe_version: { connect: { id: recipeVersion.id } },
        position: j,
        text: notes[j],
        global: true
      }
    });
  }
  res.json(recipeVersion);
};
