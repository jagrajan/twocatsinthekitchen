import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIntroduction } from 'store/recipeEditor/actions';
import MarkdownEditor from 'rich-markdown-editor';
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


`;

const BlogPostEditor: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIntroduction(content))
  }, [content]);

  async function uploadImageHandler(file: File): Promise<string> {
    const filename = await uploadBlogImage(file);
    return `${IMAGE_SERVER}/${filename}`;
  }

  return (
    <Container className={classes.container}>
      <MarkdownEditor
        defaultValue={content}
        onChange={value => dispatch(setIntroduction(value()))}
        uploadImage={uploadImageHandler}
      />
    </Container>
  );
}

export default BlogPostEditor;
