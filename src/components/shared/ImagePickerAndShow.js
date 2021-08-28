import * as React from 'react';

import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import Box from '@material-ui/core/Box';


export default function ImagePickerAndShow(props) {
  let imagePickerRef = React.useRef(null);
  const [hasError, setHasError] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const [error, setError] = React.useState({ has: false, type: null });


  const handleEscolherImagemClick = () => {
    imagePickerRef.current.click();
  };

  const myHandleInpuChange = (e) => {
    const [file] = e.target.files;

    setImage(null);

    if (!file)
      return setError({ has: true, type: 'FILE_NOT_EXISTS' });
    if (!file.type.startsWith('image/'))
      return setError({ has: true, type: 'FILE_UNEXPECTED' });
    if (file.size > 2000000)
      return setError({ has: true, type: 'FILE_TOO_LARGE' });
    

    props.inputProps.onChange(e);
    setError({ has: false, type: null });
    setImage(file);
  }

  React.useEffect(() => {
    setImage(null)
  }, [props.hidden])


  return (
    <>

      <Box textAlign='right'>
        <input type='file' required
          {...props.inputProps} ref={(input) => { props.inputProps.ref(input); imagePickerRef.current = input; }}
          onChange={myHandleInpuChange} accept="image/png, image/jpeg"
          style={{ opacity: 0, position: 'absolute', right: 0, width: 32, height: 32, zIndex: 0 }} />
      </Box>
      {
        (image) && (
          <div>
            <img src={URL.createObjectURL(image)} alt='comprovativo' style={{ width: '100%', borderRadius: 8 }} />
          </div>
        )
      }
      <IconButton onClick={handleEscolherImagemClick} {...props.iconButtonProps}>
        <AddPhotoAlternateOutlinedIcon />
      </IconButton>

      {error.has &&
        <Box p={2} pl={2} color='error.main'>
          {error.type === 'FILE_TOO_LARGE' ? 'Oophs! A imagem é muito grande, tamanho máximo permitido é 2 MB.' : error.type === 'FILE_UNEXPECTED' ? 'Formato de ficheiro não permitido! Deve ser inserida uma imagem!' : 'Ooops! Um erro desconhecido aconteceu'}
        </Box>
      }
    </>
  )
}