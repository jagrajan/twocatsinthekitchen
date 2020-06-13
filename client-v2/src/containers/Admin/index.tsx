import React, { FC } from 'react';
import { makeStyles  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UndecoratedLink from 'components/UndecoratedLink';
import imgCookbook from 'assets/admin-dashboard/cookbook.jpg';

const useStyles = makeStyles(theme => ({
  media: {
    height: 140,
  },
}));


const Admin: FC = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container>
        <Grid item sm={12} md={6} lg={4}>
          <Card>
            <UndecoratedLink to="/admin/recipes">
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={imgCookbook}
                  title="Cookbook"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Manage Recipes
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Create and update recipes.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </UndecoratedLink>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;
