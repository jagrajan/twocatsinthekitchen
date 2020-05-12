import { Request, Response } from 'express';
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
