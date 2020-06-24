import React, { FC, useState, useEffect, MutableRefObject } from 'react';
import { DropzoneArea, DropzoneAreaProps } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'

interface Props {
  dropzoneProps?: DropzoneAreaProps;
  cropperRef?: MutableRefObject<Cropper | null>;
  originalImage?: string;
}

const DropzoneCropper: FC<Props> = ({ cropperRef, dropzoneProps, originalImage }) => {
  const [ file, setFile ] = useState<string | null>(null);

  useEffect(() => {
    setFile(originalImage || null);
  }, [originalImage]);

  const onFileChange = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.error('file reading has failed');
      reader.onload = () => {
        if (reader.result !== null && typeof reader.result === 'string') {
          setFile(reader.result);
        }
      }
      reader.readAsDataURL(file);
    }
  };
  const onDeleteClick = () => { setFile(null) };

  if (file === null) {
    return <DropzoneArea filesLimit={1} {...dropzoneProps} onChange={onFileChange} />;
  } else {
    return (
      <>
        <Cropper
          style={{height: '25rem', margin: '1rem auto' }}
          aspectRatio={1/1}
          src={file}
          guides={true}
          viewMode={2}
          autoCropArea={1}
          ref={cropperRef}
        />
        <Box textAlign="center">
          <Button
            color="primary"
            onClick={onDeleteClick}
            size="large"
            variant="contained"
          >
            Delete
          </Button>
        </Box>
      </>
    );
  }
}

export default DropzoneCropper;
