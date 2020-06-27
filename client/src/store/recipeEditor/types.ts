import { recipe_version } from '@twocats/server/node_modules/.prisma/client';

export interface RecipeRelease {
  latest: recipe_version;
  released?: recipe_version;
}

export type RecipeVersion = recipe_version;
