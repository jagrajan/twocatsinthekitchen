import { Request, Response } from 'express';
import client from 'db';
import Recipe from 'models/cookbook/Recipe';
import RecipeFetcher from 'models/cookbook/RecipeFetcher';
import RecipeVersionFetcher from 'models/cookbook/RecipeVersionFetcher';

export const getRecent = async (req: Request, res: Response): Promise<void> => {
  let response: any = {};
  let limit = 10;
  if (req.query.limit) {
    limit = parseInt(req.query.limit.toString());
  }
  const fetcher = new RecipeFetcher();
  const versionFetcher = new RecipeVersionFetcher();
  let recipes = await fetcher.getRecentRecipes(limit);
  if (recipes != null) {
    response.recipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const version = await versionFetcher.getReleasedVersion(recipes[i]);
      if (version != null) {
        response.recipes.push({
          metadata: recipes[i].dataValues,
          info: version.dataValues
        });
      }
    }
  } else {
    response.error = 'No recipes found';
  }
  res.json(response);
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
  const results = await client.query(`
    SELECT
      r.id,
      rv.name,
      r.latest_version,
      r.released_version,
      r.last_update,
      r.create_date,
      r.hidden
    FROM cookbook.recipe r
    INNER JOIN cookbook.recipe_version rv
      ON r.id = rv.recipe_id AND r.released_version = rv.version
  `);

  res.json({
    recipes: results.rows
  });
};
