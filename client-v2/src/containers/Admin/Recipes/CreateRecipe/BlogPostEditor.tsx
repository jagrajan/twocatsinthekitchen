import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@twocats/store';
import { setIntroduction } from 'store/recipeEditor/actions';
import MarkdownEditor, {  } from 'rich-markdown-editor';
import theme from './markdownConfig';
import Container from '@material-ui/core/Container';
import { uploadBlogImage } from 'services/api/api-recipe-editor';
import { makeStyles } from '@material-ui/core/styles';
import { IMAGE_SERVER } from 'config';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '2rem auto',
  },
}));

const content = `
## Heading 2

![](http://localhost:4000/image/196fcf0d-6524-4976-8a01-8d85132278ab.jpg)

This is a recipe introduction. I talk a lot as I talk about food with you. What do you think about my food!

This is a recipe introduction. I talk a lot as I talk about food with you. What do you think about my food!

This is a recipe introduction. I talk a lot as I talk about food with you. What do you think about my food!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis quam risus, ac fermentum metus [lacinia et](https://wikipedia.org). Ut volutpat sapien id mattis accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque vitae tempor lorem, non.

![](http://localhost:4000/image/f116c862-85b2-4558-b979-a0e8ddefb886.jpg)

`;

const BlogPostEditor: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const introduction = useSelector<RootState, string>((state: RootState) => {
    return state.recipeEditor.recipe.introduction;
  });
  const loading = useSelector<RootState, boolean>((state: RootState) => {
    return state.recipeEditor.loading;
  });
  console.log(introduction);

  useEffect(() => {
    dispatch(setIntroduction(content))
  }, [dispatch]);

  async function uploadImageHandler(file: File): Promise<string> {
    const filename = await uploadBlogImage(file);
    return `${IMAGE_SERVER}/${filename}`;
  }

  return (
    <Container className={classes.container}>
      {!loading && <MarkdownEditor
        defaultValue={introduction}
        onChange={(value) => dispatch(setIntroduction(value()))}
        theme={theme}
        uploadImage={uploadImageHandler}
      />}
    </Container>
  );
}

export default BlogPostEditor;
