import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { RootState } from "@twocats/store";
import { IMAGE_SERVER } from "config";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MarkdownEditor from "rich-markdown-editor";
import { uploadBlogImage } from "services/api/api-recipe-editor";
import { setIntroduction } from "store/recipeEditor/actions";
import theme from "./markdownConfig";

const useStyles = makeStyles(() => ({
  container: {
    margin: "2rem auto",
  },
}));

const content = `
## A heading

Here's a little something to get your started!

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

  useEffect(() => {
    dispatch(setIntroduction(content));
  }, [dispatch]);

  async function uploadImageHandler(file: File): Promise<string> {
    const filename = await uploadBlogImage(file);
    return `${IMAGE_SERVER}/${filename}`;
  }

  return (
    <Container className={classes.container}>
      {!loading && (
        <MarkdownEditor
          defaultValue={introduction}
          onChange={(value) => {
            dispatch(setIntroduction(value().replace(/^\\/gm, '')));
          }}
          theme={theme}
          uploadImage={uploadImageHandler}
        />
      )}
    </Container>
  );
};

export default BlogPostEditor;
