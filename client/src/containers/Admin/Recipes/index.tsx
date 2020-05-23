import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'store';
import { fetchDashboardRecipes } from 'store/recipeEditor/actions';
import UndecoratedLink from 'components/UndecoratedLink';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table';

const AdminRecipes: FC<PropsFromRedux> = ({ authKey, fetchDashboardRecipes, recipes }) => {
  // Columns: recipe name, latest_version, released_version, create_date, last_update, hidden
  const history = useHistory();
  useEffect(() => {
    fetchDashboardRecipes();
  }, [authKey])
  return (
    <Container>
      <Box textAlign="right" my={3}>
        <UndecoratedLink to="/admin/create-recipe">
          <Button variant="contained" color="primary">Create a Recipe</Button>
        </UndecoratedLink>
      </Box>
      {recipes &&
        <MaterialTable
           columns={[
            { title: "Recipe ID", field: "id", hidden: true },
            { title: "Name", field: "name"  },
            { title: "Released Version", field: "released_version", type: "numeric"  },
            { title: "Latest Version", field: "latest_version", type: "numeric"  },
            { title: "Hidden", field: "hidden", type: "boolean"  },
            { title: "Last Updated", field: "last_update", type: "datetime"  },
            { title: "Date Created", field: "create_date", type: "datetime"  },
          ]}
          data={recipes}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Recipe',
              onClick: (event, rowData) => {
                if (Array.isArray(rowData)) {
                  history.push(`/admin/recipe-overview/${rowData[0].id}`)
                } else {
                  history.push(`/admin/recipe-overview/${rowData.id}`)
                }
              }
            }
          ]}
          title="Recipes Overview"
        />
      }
    </Container>
  );
};

const mapState = (state: RootState) => ({
  authKey: state.auth.info,
  recipes: state.recipeEditor.dashboardRecipes,
});

const mapDispatch = {
  fetchDashboardRecipes
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AdminRecipes);
