import axios from './axios';
import * as auth from './api/api-auth';
import * as recipe from './api/api-recipe';

export default {
  axios,
  api: {
    auth,
    recipe,
  },
};
