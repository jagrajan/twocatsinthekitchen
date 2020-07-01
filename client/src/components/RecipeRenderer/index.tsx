import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';
import Markdown, { Renderer } from 'react-markdown';
import styled from 'styled-components';
import RecipeCard from '../RecipeCard';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

const StyledContainer = styled.div`
  img {
    max-width: 100%;
    @media only screen and (min-width: 900px)  {
      max-width: 70%;
    }
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
  scale?: number;
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
  scale,
  servings,
  steps,
}) => (
  <StyledContainer>
    <Box textAlign='center'>
      <Typography variant="h3" component="h1">
        {name}
      </Typography>
    </Box>
    <Container maxWidth='md'>
      <Markdown source={introduction} renderers={{ image }} />
    </Container>
    <Container maxWidth="md">
      <Box my={2}>
        <Divider />
      </Box>
      <RecipeCard
        cookTime={cookTime}
        imageUrl={imageUrl}
        ingredients={ingredients}
        name={name}
        notes={notes}
        prepTime={prepTime}
        scale={scale || 1}
        servings={servings}
        steps={steps}
      />
      <Box my={2}>
        <Divider />
      </Box>
    </Container>
  </StyledContainer>
);

export default RecipeRenderer;
