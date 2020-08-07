import prisma from "db/prisma";
import { Request, Response } from "express";
import { Request as TCRequest } from "@twocats/types";

export const getRecent = async (req: Request, res: Response): Promise<void> => {
  let limit = 6;
  if (req.query.limit) {
    limit = parseInt(req.query.limit.toString());
  }
  const recipes = await prisma.recipe_release.findMany({
    include: {
      recipe_version_recipe_release_released_versionTorecipe_version: true,
    },
    orderBy: {
      recipe_id: "desc",
    },
    take: limit,
    where: {
      NOT: {
        released_version: null,
      },
    },
  });
  res.json(
    recipes.map(
      (x) => x.recipe_version_recipe_release_released_versionTorecipe_version
    )
  );
};

export const getVersionDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const recipeVersionId = parseInt(req.params.recipeId);
  const results = await prisma.recipe_version.findOne({
    include: {
      measured_ingredient: {
        select: {
          alternative_measurement: {
            include: { unit: true },
          },
          min_amount: true,
          max_amount: true,
          unit: true,
          ingredient: true,
          instructions: true,
        },
        orderBy: { position: "asc" },
      },
      recipe_step: {
        select: { description: true },
        orderBy: { position: "asc" },
      },
      recipe_note: { select: { text: true }, orderBy: { position: "asc" } },
      recipe_tag: { select: { tag: { select: { id: true, text: true } } } },
    },
    where: { id: recipeVersionId },
  });
  res.json(results);
};

export const getVersions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const versions = await prisma.recipe_version.findMany({
    where: { recipe_id: id },
  });
  res.json(versions);
};

export const search = async (
  req: Request,
  res: Response
): Promise<void> => {
  const recipes = await prisma.recipe_release.findMany({
    include: {
      recipe_version_recipe_release_released_versionTorecipe_version: true,
    },
    orderBy: {
      recipe_id: "desc",
    },
    where: {
      NOT: {
        released_version: null,
      },
    },
  });
  res.json(
    recipes.map(
      (x) => x.recipe_version_recipe_release_released_versionTorecipe_version
    )
  );
};

export const getById = async (
  req: Request,
  res: Response
): Promise<void> => {
  let input: string = req.params.id;
  let where: { slug: string } | { recipe_id: number } = { slug: input };

  if (input && !isNaN(input as any)) {
    where = { recipe_id: parseInt(input) };
  }

  const result = await prisma.recipe_version.findMany({
    include: {
      measured_ingredient: {
        select: {
          alternative_measurement: {
            include: { unit: true },
          },
          min_amount: true,
          max_amount: true,
          unit: true,
          ingredient: true,
          instructions: true,
        },
        orderBy: { position: "asc" },
      },
      recipe_step: {
        select: { description: true },
        orderBy: { position: "asc" },
      },
      recipe_note: { select: { text: true }, orderBy: { position: "asc" } },
    },
    where: {
      recipe_release_recipe_release_released_versionTorecipe_version: {
        some: { released_version: { not: null } },
      },
      ...where,
    },
  });
  res.json(result.length == 1 ? result[0] : {});
};

export const getDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  const results = await prisma.recipe_release.findMany({
    include: {
      recipe_version_recipe_release_latest_versionTorecipe_version: true,
      recipe_version_recipe_release_released_versionTorecipe_version: true,
    },
    orderBy: {
      create_date: 'desc'
    },
  });

  res.json(
    results.map((x) => ({
      released:
        x.recipe_version_recipe_release_released_versionTorecipe_version,
      latest: x.recipe_version_recipe_release_latest_versionTorecipe_version,
      recipe_id: x.recipe_id,
      create_date: x.create_date,
    }))
  );
};

export const getRelease = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const result = await prisma.recipe_release.findOne({
    include: {
      recipe_version_recipe_release_latest_versionTorecipe_version: true,
      recipe_version_recipe_release_released_versionTorecipe_version: true,
    },
    where: { recipe_id: id },
  });
  if (result) {
    const {
      recipe_version_recipe_release_latest_versionTorecipe_version: latest,
      recipe_version_recipe_release_released_versionTorecipe_version: released,
    } = result;
    res.json({
      latest,
      released,
    });
  } else {
    res.json({});
  }
};

export const postRelease = async (
  req: Request,
  res: Response
): Promise<void> => {
  const recipeId = parseInt(req.params.id);
  const { id: versionId } = req.body;
  const update =
    versionId === "false"
      ? { disconnect: true }
      : { connect: { id: parseInt(versionId) } };
  const result = await prisma.recipe_release.update({
    data: {
      recipe_version_recipe_release_released_versionTorecipe_version: update,
    },
    include: {
      recipe_version_recipe_release_latest_versionTorecipe_version: true,
      recipe_version_recipe_release_released_versionTorecipe_version: true,
    },
    where: { recipe_id: recipeId },
  });
  if (result) {
    res.json({
      latest:
        result.recipe_version_recipe_release_latest_versionTorecipe_version,
      released:
        result.recipe_version_recipe_release_released_versionTorecipe_version,
    });
  } else {
    res.json({});
  }
};

export const postIndex = async (req: Request, res: Response): Promise<void> => {
  const recipe = req.body as TCRequest.CreateRecipe;
  const recipeId =
    recipe.recipe_id || (await prisma.recipe.create({ data: {} })).id;
  let version = 1;
  if (recipe.recipe_id) {
    const latest = await prisma.recipe_release.findOne({
      include: {
        recipe_version_recipe_release_latest_versionTorecipe_version: true,
      },
      where: { recipe_id: recipeId },
    });
    version =
      (latest?.recipe_version_recipe_release_latest_versionTorecipe_version
        ?.version || 0) + 1;
  }
  const recipeVersion = await prisma.recipe_version.create({
    data: {
      name: recipe.name,
      description: recipe.description,
      slug: recipe.slug,
      cook_time: recipe.cookTime,
      prep_time: recipe.prepTime,
      serves: recipe.servings,
      version,
      introduction: recipe.introduction,
      image_file: recipe.imageFile,
      recipe: {connect: {id: recipeId}},
      recipe_step: {
        create: recipe.steps.map((description, position) => ({
          position,
          description,
        }))
      },
      recipe_tag: {
        create: recipe.tags.map(tag => ({
          tag: { connect: { id: tag } }
        })),
      }
    },
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
        instructions: ingredients[j].instructions || '',
        alternative_measurement: {
          create: ingredients[j].alternativeMeasurement.map(a => ({
            max_amount: a.maxAmount,
            min_amount: a.minAmount,
            unit: { connect: { id: a.unit }},
          })),
        },
      },
    });
  }
  for (let j = 0; j < notes.length; j++) {
    await prisma.recipe_note.create({
      data: {
        recipe_version: { connect: { id: recipeVersion.id } },
        position: j,
        text: notes[j],
        global: true,
      },
    });
  }
  if (recipe.recipe_id) {
    await prisma.recipe_release.update({
      data: {
        recipe_version_recipe_release_latest_versionTorecipe_version: {
          connect: { id: recipeVersion.id },
        },
      },
      where: {
        recipe_id: recipe.recipe_id,
      },
    });
  } else {
    await prisma.recipe_release.create({
      data: {
        recipe: { connect: { id: recipeId } },
        recipe_version_recipe_release_latest_versionTorecipe_version: {
          connect: { id: recipeVersion.id },
        },
      },
    });
  }
  res.json(recipeVersion);
};
