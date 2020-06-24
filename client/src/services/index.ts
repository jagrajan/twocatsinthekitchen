import axios from './axios';
import * as auth from './api/api-auth';
import * as recipe from './api/api-recipe';
import * as recipeEditor from './api/api-recipe-editor';

export default {
  axios,
  api: {
    auth,
    recipe,
    recipeEditor,
  },
};
