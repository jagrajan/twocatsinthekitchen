import { CreateRecipeBody } from '@twocats/server/src/types/requests';
import { RootEpic } from '@twocats/store';
import { push } from 'connected-react-router';
import { initialize } from 'redux-form';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, filter, map, mergeMap, switchMap, withLatestFrom, } from 'rxjs/operators';
import { addMessage } from 'store/feedback/actions';
import { isActionOf } from 'typesafe-actions';
import {
  addTag,
  createIngredientAsync,
  createRecipeAsync,
  createTagAsync,
  createUnitAsync,
  loadAllIngredientsAsync,
  loadAllTagsAsync,
  loadAllUnitsAsync,
  loadDashboardRecipesAsync,
  loadRecipeDetailsAsync,
  loadRecipeReleaseAsync,
  loadRecipeVersionsAsync,
  setImageFile,
  setIngredients,
  setIntroduction,
  setNotes,
  setRecipeId,
  setSteps,
  setTags,
  updateRecipeReleaseAsync,
  uploadBlogImageAsync,
  uploadRecipeImageAsync,
} from './actions';

export const loadDashboardRecipesEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadDashboardRecipesAsync.request)),
    switchMap(() =>
      from(api.recipeEditor.loadRecentRecipes()).pipe(
        map((x) => loadDashboardRecipesAsync.success(x)),
        catchError(() => of(loadDashboardRecipesAsync.failure()))
      )
    )
  );

export const loadAllIngredientsEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadAllIngredientsAsync.request)),
    switchMap(() =>
      from(api.recipeEditor.loadAllIngredients()).pipe(
        map((x) => loadAllIngredientsAsync.success(x)),
        catchError(() => of(loadAllIngredientsAsync.failure()))
      )
    )
  );

export const loadAllTagsEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadAllTagsAsync.request)),
    switchMap(() =>
      from(api.recipeEditor.loadAllTags()).pipe(
        map((x) => loadAllTagsAsync.success(x)),
        catchError((error) => of(loadAllTagsAsync.failure(error)))
      )
    )
  );

export const loadAllUnitsEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadAllUnitsAsync.request)),
    switchMap(() =>
      from(api.recipeEditor.loadAllUnits()).pipe(
        map((x) => loadAllUnitsAsync.success(x)),
        catchError(() => of(loadAllUnitsAsync.failure()))
      )
    )
  );

export const createRecipeEpic: RootEpic = (action$, state$, { api }) =>
  action$.pipe(
    filter(
      isActionOf([createRecipeAsync.request, uploadRecipeImageAsync.success])
    ),
    withLatestFrom(state$),
    switchMap(([, state]) =>
      from(
        (() => {
          const recipe: CreateRecipeBody = {
            cookTime: state.form.recipeEditor?.values?.cookTime || 'error',
            description:
              state.form.recipeEditor?.values?.description || 'No name',
            imageFile: state.recipeEditor.recipe.imageFile || 'default.png',
            ingredients: state.recipeEditor.recipe.ingredients
              .map((ing) => ({
                alternativeMeasurement: ing.alternativeMeasurement.map(x => ({
                  maxAmount: x.maxAmount,
                  minAmount: x.minAmount,
                  unit: x.unit.id,
                })),
                ingredient: ing.ingredient.id,
                instructions: ing.instructions,
                maxAmount: ing.maxAmount,
                minAmount: ing.minAmount,
                unit: ing.unit.id,
              }))
              .toArray(),
            introduction: state.recipeEditor.recipe.introduction,
            recipe_id: state.recipeEditor.recipe.recipeId || undefined,
            name: state.form.recipeEditor?.values?.name || 'No name',
            notes: state.recipeEditor.recipe.notes.toArray(),
            prepTime: state.form.recipeEditor?.values?.prepTime || 'error',
            servings:
              parseInt(
                state.form.recipeEditor?.values?.servings.toString(),
                10
              ) || 3,
            slug: state.form.recipeEditor?.values?.slug || 'error',
            steps: state.recipeEditor.recipe.steps.toArray(),
            tags: state.recipeEditor.recipe.tags.toArray().map(tag => tag.id),
          };
          return api.recipeEditor.createRecipe(recipe);
        })()
      ).pipe(
        mergeMap((x) =>
          of(createRecipeAsync.success(x), push({ pathname: '/admin/recipes' }))
        ),
        catchError(() => of(createRecipeAsync.failure()))
      )
    )
  );

export const createIngredientEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createIngredientAsync.request)),
    mergeMap((action) =>
      from(api.recipeEditor.createIngredient(action.payload)).pipe(
        mergeMap((x) =>
          of(
            createIngredientAsync.success(x),
            loadAllIngredientsAsync.request(),
            addMessage({
              key: 'add-ingredient',
              color: 'success',
              message: `${x.name} has been added to the database!`,
            })
          )
        ),
        catchError((error) => of(createIngredientAsync.failure(error)))
      )
    )
  );

export const createTagEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createTagAsync.request)),
    mergeMap((action) =>
      from(api.recipeEditor.createTag(action.payload.text)).pipe(
        mergeMap((x) =>
          of(
            createTagAsync.success(x),
            loadAllTagsAsync.request(),
            addTag(x),
            addMessage({
              key: 'add-tag',
              color: 'success',
              message: `${x.text} has been added to the database!`,
            })
          )
        ),
        catchError((error) => of(createIngredientAsync.failure(error)))
      )
    )
  );

export const createUnitEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createUnitAsync.request)),
    mergeMap((action) =>
      from(api.recipeEditor.createUnit(action.payload)).pipe(
        mergeMap((x) =>
          of(
            createUnitAsync.success(x),
            loadAllUnitsAsync.request(),
            addMessage({
              color: 'success',
              key: 'add-unit',
              message: `${x.name} has been added to the database!`,
            })
          )
        ),
        catchError((error) => of(createIngredientAsync.failure(error)))
      )
    )
  );

export const uploadRecipeImageEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(uploadRecipeImageAsync.request)),
    exhaustMap((action) =>
      from(
        api.recipeEditor.uploadBlogImage(
          new File([action.payload], 'image.png')
        )
      ).pipe(
        map((x) => uploadRecipeImageAsync.success(x)),
        catchError(() => of(uploadRecipeImageAsync.failure()))
      )
    )
  );

export const uploadBlogImageEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(uploadBlogImageAsync.request)),
    exhaustMap((action) =>
      from(api.recipeEditor.uploadBlogImage(action.payload)).pipe(
        map((x) => uploadBlogImageAsync.success(x)),
        catchError(() => of(uploadBlogImageAsync.failure()))
      )
    )
  );

export const loadRecipeDetailsEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadRecipeDetailsAsync.request)),
    switchMap((action) =>
      from(api.recipeEditor.loadRecipeDetails(action.payload)).pipe(
        map((x) => loadRecipeDetailsAsync.success(x)),
        catchError(() => of(loadRecipeDetailsAsync.failure()))
      )
    )
  );

export const setRecipeEditorEpic: RootEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(loadRecipeDetailsAsync.success)),
    switchMap((action) => {
      const {
        name,
        description,
        slug,
        cook_time,
        prep_time,
        serves,
      } = action.payload;
      return of(
        initialize('recipeEditor', {
          cookTime: cook_time,
          description,
          name,
          prepTime: prep_time,
          servings: serves,
          slug,
        }),
        setNotes(action.payload.recipe_note.map((x) => x.text)),
        setSteps(action.payload.recipe_step.map((x) => x.description)),
        setIngredients(
          action.payload.measured_ingredient.map((x) => {
            const {
              unit,
              ingredient,
              instructions,
              min_amount,
              max_amount,
              alternative_measurement,
            } = x;
            return {
              alternativeMeasurement: (alternative_measurement || []).map(a => ({
                maxAmount: a.max_amount,
                minAmount: a.min_amount,
                unit: a.unit,
              })),
              ingredient,
              instructions,
              maxAmount: max_amount,
              minAmount: min_amount,
              unit,
            };
          })
        ),
        setRecipeId(action.payload.recipe_id),
        setImageFile(action.payload.image_file),
        setIntroduction(action.payload.introduction || ''),
        setTags(action.payload.recipe_tag.map(rt => rt.tag))
      );
    })
  );

export const loadRecipeReleaseEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadRecipeReleaseAsync.request)),
    switchMap((action) =>
      from(api.recipeEditor.loadRecipeRelease(action.payload)).pipe(
        map((x) => loadRecipeReleaseAsync.success(x)),
        catchError((error) => of(loadRecipeReleaseAsync.failure(error)))
      )
    )
  );

export const updateRecipeReleaseEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateRecipeReleaseAsync.request)),
    switchMap((action) =>
      from(
        api.recipeEditor.updateRecipeRelease(
          action.payload.id,
          action.payload.versionId
        )
      ).pipe(
        map((x) => updateRecipeReleaseAsync.success(x)),
        catchError((error) => of(updateRecipeReleaseAsync.failure(error)))
      )
    )
  );

export const loadRecipeVersionsEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(loadRecipeVersionsAsync.request)),
    switchMap((action) =>
      from(api.recipeEditor.loadRecipeVersions(action.payload)).pipe(
        map((x) => loadRecipeVersionsAsync.success(x)),
        catchError((error) => of(loadRecipeVersionsAsync.failure(error)))
      )
    )
  );
