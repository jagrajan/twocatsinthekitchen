import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';
import Markdown, { Renderer } from 'react-markdown';
import styled from 'styled-components';
import RecipeCard from '../RecipeCard';

const StyledContainer = styled.div`
  img {
    max-width: 100%;
  }

  a,
  a:link,
  a:visited {
    color: #1976d2;
  }

  .image-container {
    text-align: center;
  }

  h2 {
    font-size: 2rem;
    font-weight: 400;
  }

  font-family: "Roboto Slab", serif;
`;

type Props = {
  cookTime: string;
  imageUrl: string;
  ingredients: { text: string; position: number }[];
  introduction: string;
  name: string;
  notes: { text: string; position: number }[];
  prepTime: string;
  servings: string;
  steps: { text: string; position: number }[];
};

const image: Renderer<{ src: string, alt?: string }> = (props) => (
  <div className="image-container">
    <img alt="Food" {...props} />
  </div>
);

const RecipeRenderer: FC<Props> = ({
  cookTime,
  imageUrl,
  ingredients,
  introduction,
  name,
  notes,
  prepTime,
  servings,
  steps,
}) => (
  <StyledContainer>
    <Typography variant="h3" component="h1">
      {name}
    </Typography>
    <Markdown source={introduction} renderers={{ image }} />
    <Container maxWidth="md">
      <RecipeCard
        cookTime={cookTime}
        name={name}
        imageUrl={imageUrl}
        ingredients={ingredients}
        prepTime={prepTime}
        servings={servings}
        notes={notes}
        steps={steps}
      />
    </Container>
  </StyledContainer>
);

export default RecipeRenderer;
