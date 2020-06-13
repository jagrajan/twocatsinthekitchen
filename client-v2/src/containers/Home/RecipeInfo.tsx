import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import UndecoratedLink from 'components/UndecoratedLink';

const useStyles = makeStyles(theme => ({
  image: {
    opacity: 0,
    width: '100%',
  },
}));

type Props = {
  name: string;
  imageFile: string;
  slug: string;
  updateDate: string;
};

const RecipeInfo: FC<Props> = ({ imageFile, name, slug, updateDate }) => {
  const classes = useStyles();
  return <UndecoratedLink to={`/recipe/${slug}`}>
    <Card>
      <CardHeader
        title={name}
        subheader={updateDate}
      />
      <CardMedia
        image={imageFile}
        title={name}
      >
        <img
          className={classes.image}
          src={imageFile}
          alt={name}
        />
      </CardMedia>
    </Card>
  </UndecoratedLink>;
};

export default RecipeInfo;
