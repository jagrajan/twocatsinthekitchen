import React, { FC } from 'react';
import styled from 'styled-components';
import Markdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';
import RecipeCard from '../RecipeCard';

const StyledContainer = styled.div`
img {
  max-width: 100%;
  margin: 0 auto;
}

a,
a:link,
a:visited {
  color: #1976d2;
}

h2 {
  font-size: 2rem;
  font-weight: 400;
}

font-family: "Roboto Slab", serif;
`;

type Props = {
  imageUrl: string;
  ingredients: {text: string, position: number}[];
  introduction: string;
  name: string;
  steps: {text: string, position: number}[];
}

const RecipeRenderer: FC<Props> = ({ name, imageUrl, introduction, ingredients, steps }) => {
  return (
    <StyledContainer>
      <Typography variant='h3' component='h1'>{name}</Typography>
      <Markdown source={introduction} />
      <RecipeCard
        name={name}
        imageUrl={imageUrl}
        ingredients={ingredients}
        steps={steps}
      />
    </StyledContainer>
  );
}

export default RecipeRenderer;
