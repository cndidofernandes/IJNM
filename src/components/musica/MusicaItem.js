import React from "react";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

import CardMedia from "@material-ui/core/CardMedia";
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import AspectRatio from "../shared/AspectRatio";
import dateToString from "../../helpers/dateToString";
import { makeStyles } from '@material-ui/styles';
import PanelItem from "../shared/PanelItem";

const useStyle = makeStyles(theme => ({
  playButton: {
    marginTop: theme.spacing(3),
    fontSize: 36,
    borderRadius: '50%',
    padding: -16,
    color: "#fff",

  },
  cover: {
    height: 200,
    borderRadius: 4,
  },
}));



export default function MusicaItem({ musica, onDeleteClick, ...rest }) {

  const [hideImage, setHideImage] = React.useState(1);
  const classes = useStyle();
  const onLoadImageFail = ()=>{
    setHideImage(0);
  }


  if (!musica) {
    return (<>Dados corrompidos</>);
  }


  return (
    <Box {...rest}>
      <Box borderRadius={4} position='relative' component={Link} target="_blank" rel="noreferrer" underline="none" href={musica.linkDaMusica}>
        <AspectRatio width='100%' aspectRatio={1} mb={2} bgcolor='#2e2e2e' position='relative' >
          <CardMedia className={classes.cover} image={process.env.IMAGE_BASE_URL+'/'+musica.capaUrl} title={musica.titulo} component={'img'} onError={onLoadImageFail} style={{opacity: hideImage}}/>

          <Box borderRadius={2.5} style={{ background: 'linear-gradient(45deg, #212121, transparent)', width: "100%", height: "100%", }} color='#fff' position='absolute' top={0} left={0} p={2} display='flex' alignItems={'center'} >
            <div>
              <MusicNoteRoundedIcon className={classes.playButton} fontSize='inherit' />
              <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                {musica.titulo}
              </Box>
              <Box display='flex' alignItems={'center'}>
                <Box fontSize='body2.fontSize'>
                  {musica.artista}
                </Box>
                <Box fontSize={'caption.fontSize'} mx={1}>
                  {'•'}
                </Box>
                <Box color='#fff' fontSize='caption.fontSize'>
                  {dateToString('d m Y', musica.criadoEM)}
                </Box>
              </Box>
            </div>
          </Box>

        </AspectRatio>

      </Box>

      {
          
          onDeleteClick &&(
            <PanelItem mt={-2} onDeleteClick={onDeleteClick}/>
            )
        }

    </Box>
  )
}