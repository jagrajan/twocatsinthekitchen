import React, { ChangeEvent, FC, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Tag } from 'store/recipeEditor/actions';

const filter = createFilterOptions<Tag>();

interface Props {
  addTag: (tag: Tag) => void;
  allTags: Tag[];
  createTag: (payload: { text: string, addTag: boolean }) => void;
  removeTag: (position: number) => void;
  tags: Tag[];
}

type TagWithInput = Tag & {
  inputValue?: string
};

const TagsManager: FC<Props> = ({
  addTag,
  allTags,
  createTag,
  removeTag,
  tags,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            clearOnBlur
            freeSolo
            filterOptions={(options, params) => {
              const filtered = filter(options, params) as TagWithInput[];
              if (params.inputValue !== '' && !filtered.map(tag => tag.text).includes(params.inputValue)) {
                filtered.push({
                  id: -1,
                  inputValue: params.inputValue,
                  text: `Add "${params.inputValue}"`,
                });
              }

              return filtered;
            }}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              if (option.inputValue) {
                return option.text;
              }
              return option.text;
            }}
            id="combo-box-tag"
            onChange={(event, item) => {
              if (item === null || typeof item === 'string') {
              } else if (item.inputValue) {
                createTag({ addTag: true, text: item.inputValue });
              } else {
                addTag(item);
              }
              setTimeout(() => {
                if (ref.current) {
                  ref.current.value = '';
                }
              }, 250);
            }}
            options={allTags as TagWithInput[]}
            renderInput={(params) => (
              <TextField {...params} inputRef={ref} label="Tag" variant="outlined" />
            )}
            value={null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {tags.length === 0 && <p>Add some tags to this recipe!</p>}
          <List>
            {tags.map((tag, position) => (
              <ListItem key={position}>
                <ListItemText>{tag.text}</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton onClick={() => removeTag(position)}><DeleteIcon /></IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default TagsManager;
