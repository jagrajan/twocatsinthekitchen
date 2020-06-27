import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { RootState } from '@twocats/store';
import { createMatchSelector } from 'connected-react-router';
import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { loadRecipeReleaseAsync, loadRecipeVersionsAsync, updateRecipeReleaseAsync } from 'store/recipeEditor/actions';
import VersionOverview from './VersionOverview';

const RecipeOverview: FC<PropsFromRedux> = ({
  loadRecipeRelease,
  loadRecipeVersion,
  match,
  recipeName,
  release,
  updateRecipeRelease,
  versions,
}) => {
  const id = match?.params.id;
  useEffect(() => {
    if (id) {
      loadRecipeRelease(id);
      loadRecipeVersion(id);
    }
  }, [loadRecipeRelease, loadRecipeVersion, id])
  const onPrimaryClick = (versionId: number | string) => {
    updateRecipeRelease({
      id: (id as string),
      versionId,
    });
  };
  return (
    <Container>
      <Typography component="h2" variant="h3">{recipeName}</Typography>
      {versions.sort((a, b) => b.version - a.version).map((v) => (
        <VersionOverview
          isReleased={release?.released?.id === v.id}
          onPrimaryClick={() => onPrimaryClick(release?.released?.id === v.id ? 'false' : v.id )}
          version={v}
        />
      ))}
    </Container>
  );
};

const mapState = (state: RootState) => ({
  match: createMatchSelector<RootState, {id: string | undefined }>('/admin/recipes/overview/:id')(state),
  recipeName: state.recipeEditor.recipeOverview.release?.latest.name || 'Loading...',
  release: state.recipeEditor.recipeOverview.release,
  versions: state.recipeEditor.recipeOverview.versions,
});

const mapDispatch = {
  loadRecipeRelease: loadRecipeReleaseAsync.request,
  loadRecipeVersion: loadRecipeVersionsAsync.request,
  updateRecipeRelease: updateRecipeReleaseAsync.request,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RecipeOverview);
