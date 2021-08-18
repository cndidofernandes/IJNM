import React from "react";

import ReactPlayer from 'react-player'

import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from "@material-ui/styles";

import CardMedia from "@material-ui/core/CardMedia";
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

import AspectRatio from "../shared/AspectRatio";

import Grid from "@material-ui/core/Grid";

import dateToString from "../../helpers/dateToString";
import { CardActionArea } from "@material-ui/core";

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
    '&:hover': {
      transform: 'scale(1.3)'
    }

  },
  cover: {
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

  const router = useRouter();

  if (!pregacao) {
    return (<>Dados Corrompidos</>);
  }

  return (
    <CardActionArea onClick={() => router.push(`/pregacoes/${pregacao.slug}`)}>
      <Box>
        <Box position='relative'>
          <AspectRatio width='100%' aspectRatio={1} mb={1} bgcolor='text.secondary' position='relative'>
            <CardMedia className={classes.cover} image={pregacao.capaUrl} title={pregacao.tema} component={'img'} />
            <PlayArrowRoundedIcon className={classes.playButton} fontSize='inherit' />
          </AspectRatio>
        </Box>

        <Box mt={1.8} fontSize='subtitle2.fontSize' fontWeight="fontWeightMedium">
          {pregacao.tema}
        </Box>

        <Box my={0.2} pb={.7} color='text.secondary' fontSize={'0.83rem'}>
          {pregacao.pregador}
        </Box>

        <Box fontSize='caption.fontSize' color='text.secondary'>
          {dateToString('d/M/Y', pregacao.data)}
        </Box>

      </Box>
    </CardActionArea>
  )
}
