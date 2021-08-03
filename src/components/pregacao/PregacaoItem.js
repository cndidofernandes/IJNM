import React from "react";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";

import CardMedia from "@material-ui/core/CardMedia";
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

import AspectRatio from "../shared/AspectRatio";
import dateToString from "../../helpers/dateToString";

const useStyle = makeStyles(theme => ({
  playButton: {
    position: 'absolute',
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "50%",
    marginTop: -20,
    marginLeft: -20,
    fontSize: 48,
    borderRadius: '50%',
    padding: -16,
    backgroundColor: "rgba(0,0,0, .3)",
    color: '#fff',
    '&:hover':{
      transform: 'scale(1.3)'
    }

  },
  cover: {
    borderRadius: 8,
    height: 204,
    [theme.breakpoints.up('lg')]: {
      height: 194,
    },
    [theme.breakpoints.up('xl')]: {
      height: 284,
    },
  },
}));



export default function PregacaoItem({ pregacao }) {
  const classes = useStyle();

  if (!pregacao) {
    return (<>Dados Corrompidos</>);
  }

  return (
    <Box>
      <Box borderRadius={8} position='relative' component={Link} underline="none" href={pregacao.linkDoVideo}>
        <AspectRatio width='100%' aspectRatio={1} mb={2} bgcolor='text.secondary' position='relative'>
          <CardMedia className={classes.cover} image={pregacao.capaUrl} title={pregacao.tema} component={'img'} />
          <PlayArrowRoundedIcon className={classes.playButton} fontSize='inherit' />
        </AspectRatio>
      </Box>
      <Box fontSize='subtitle2.fontSize' fontWeight='fontWeightMedium' children={pregacao.tema} />
      <Box display='flex' alignItems={'center'}>
        <Box color='text.secondary' fontSize='body2.fontSize' children={pregacao.pregador} />
      </Box>

    </Box>
  )
}
