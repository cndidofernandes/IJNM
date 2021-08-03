import * as React from 'react';

import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import Box from '@material-ui/core/Box';


export default function ImagePickerAndShow(props) {
  let imagePickerRef = React.useRef(null);
  const [hasError, setHasError] = React.useState(null);
  const [image, setImage] = React.useState(null);


  const handleEscolherImagemClick = () => {
    imagePickerRef.current.click();
  };

  const myHandleInpuChange = (e) => {
    props.inputProps.onChange(e)

    const [file] = e.target.files;

    if (file) {
      if (file.type.startsWith('image/')) {
        setImage(file);
      } else {
        setHasError(true);
      }
    }
  }

  React.useEffect( () => {
    setImage(null)
  }, [props.hidden])


  return (
    <>

      <Box textAlign='right'>
        <input type='file' required {...props.inputProps} ref={(input) => {props.inputProps.ref(input); imagePickerRef.current = input;}}  onChange={myHandleInpuChange} accept="image/png, image/jpeg" hidden />
      </Box>

      <Box textAlign='center' display={hasError ? 'content' : 'none'} color='red' children='Formato de ficheiro não permitido! Deve ser inserida uma imagem!' />
      {
        (image) && (
          <div>
            <img src={URL.createObjectURL(image)} alt='comprovativo' style={{width: '100%',borderRadius: 8}} />
          </div>
        )
      }
      <IconButton onClick={handleEscolherImagemClick}>
        <AddPhotoAlternateOutlinedIcon />
      </IconButton>
    </>
  )
}