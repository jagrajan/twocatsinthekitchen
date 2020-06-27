import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@twocats/store';
import { getAuthKey } from 'store/auth/selectors';
import { loadDashboardRecipesAsync } from 'store/recipeEditor/actions';
import UndecoratedLink from 'components/UndecoratedLink';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table';

const AdminRecipes: FC<PropsFromRedux> = ({ authKey, loadDashboardRecipes, recipes }) => {
  // Columns: recipe name, latest_version, released_version, create_date, last_update, hidden
  const history = useHistory();
  useEffect(() => {
    loadDashboardRecipes();
  }, [authKey, loadDashboardRecipes])
  return (
    <Container>
      <Box textAlign="right" my={3}>
        <UndecoratedLink to="/admin/recipes/create">
          <Button variant="contained" color="primary">Create a Recipe</Button>
        </UndecoratedLink>
      </Box>
      {recipes &&
        <MaterialTable
           columns={[
            { title: "Recipe ID", field: "recipe_id", hidden: true },
            { title: "Name", field: "name"  },
            { title: "Released Version", field: "released_version", type: "numeric"  },
            { title: "Latest Version", field: "latest_version", type: "numeric"  },
            { title: "Hidden", field: "hidden", type: "boolean"  },
            { title: "Last Updated", field: "last_updated", type: "datetime"  },
            { title: "Date Created", field: "create_date", type: "datetime"  },
          ]}
          data={recipes}
          actions={[
            {
              icon: 'edit',
              onClick: (event, rowData) => {
                if (Array.isArray(rowData)) {
                  history.push(`/admin/recipes/overview/${rowData[0].recipe_id}`)
                } else {
                  history.push(`/admin/recipes/overview/${rowData.recipe_id}`)
                }
              },
              tooltip: 'Edit Recipe',
            }
          ]}
          title="Recipes Overview"
        />
      }
    </Container>
  );
};

const mapState = (state: RootState) => ({
  authKey: getAuthKey(state),
  recipes: state.recipeEditor.recipeDashboard.dashboardRecipes.map(x => ({
    ...x,
    released_version: x.released?.version,
    latest_version: x.latest.version,
    name: x.latest.name,
    hidden: x.released == null,
    last_updated: x.latest.create_date,
  })),
});

const mapDispatch = {
  loadDashboardRecipes: loadDashboardRecipesAsync.request,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AdminRecipes);
