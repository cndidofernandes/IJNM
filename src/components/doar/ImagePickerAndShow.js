import * as React from 'react';

import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';


export default function ImagePickerAndShow(props) {
  let imagePickerRef = React.useRef(null);
  const [error, setError] = React.useState({ has: false, type: null });
  const [image, setImage] = React.useState(null);


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
        <input type='file' required {...props.inputProps} ref={(input) => { props.inputProps.ref(input); imagePickerRef.current = input; }} onChange={myHandleInpuChange} accept="image/png, image/jpeg" hidden />
      </Box>
      {
        (image) && (
          <div>
            <img src={URL.createObjectURL(image)} alt='comprovativo' style={{ marginTop: 8, width: '100%', borderRadius: 8 }} />
          </div>
        )
      }
      <Box display='flex' alignItems='center'>
        <IconButton onClick={handleEscolherImagemClick}>
          <AddPhotoAlternateOutlinedIcon />
        </IconButton>
        <Typography variant='body2' color='textSecondary'>{props.label || 'Inserir foto do comprovativo'} *</Typography>
      </Box>

      {error.has &&
        <Box px={2} color='error.main'>
          {error.type === 'FILE_TOO_LARGE' ? 'Oophs! A foto do comprovativo é muito grande, tamanho máximo permitido é 2 MB.' : error.type === 'FILE_UNEXPECTED' ? 'Formato de ficheiro não permitido! Deve ser inserida uma imagem!' : 'Ooops! Um erro desconhecido aconteceu'}
        </Box>
      }

    </>
  )
}

/*import * as React from 'react';

import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';


export default function ImagePickerAndShow(props) {
  let imagePickerRef = React.useRef(null);
  const [error, setError] = React.useState({ has: false, type: null });
  const [image, setImage] = React.useState(null);


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
        <input type='file' required {...props.inputProps} ref={(input) => { props.inputProps.ref(input); imagePickerRef.current = input; }} onChange={myHandleInpuChange} accept="image/png, image/jpeg" hidden />
      </Box>
      {
        (image) && (
          <div>
            <img src={URL.createObjectURL(image)} alt='comprovativo' style={{ width: '100%', borderRadius: 8 }} />
          </div>
        )
      }
      <Box display='flex' alignItems='center'>
        <IconButton onClick={handleEscolherImagemClick}>
          <AddPhotoAlternateOutlinedIcon />
        </IconButton>
        <Typography variant='body2' color='textSecondary'>{props.label || 'Inserir foto do comprovativo'} *</Typography>
      </Box>

      {error.has &&
        <Box px={2} color='error.main'>
          {error.type === 'FILE_TOO_LARGE' ? 'Oophs! A foto do comprovativo é muito grande, tamanho máximo permitido é 2 MB.' : error.type === 'FILE_UNEXPECTED' ? 'Formato de ficheiro não permitido! Deve ser inserida uma imagem!' : 'Ooops! Um erro desconhecido aconteceu'}
        </Box>
      }

    </>
  )
}*/