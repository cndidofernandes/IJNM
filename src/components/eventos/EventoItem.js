import React from "react";
import Link from '@material-ui/core/Link';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import AspectRatio from "../shared/AspectRatio";
import startEndDateToString from "../../helpers/startEndDateToString";
import PlaceRoundedIcon from '@material-ui/icons/PlaceRounded';

import ScheduleIcon from '@material-ui/icons/Schedule';

import { useRouter } from "next/router";

export default function EventoItem({ actividade, ...rest }) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  if (!actividade) {
    return (<>Dados corrompidos</>);
  }


  return (

    <Box mb={4}>
      <Box bgcolor='#fff' border='1px solid #f3f3f3' borderRadius={8} width='100%' height='100%'>
        <Box position='relative' component={Link} underline="none" href={actividade.linkDoVideo}>
          <AspectRatio width='100%' aspectRatio={1} mb={2} bgcolor='#fafafa' position='relative'>
            <CardMedia style={{ borderRadius: 8, height: 194, }} image={actividade.capaUrl} title={actividade.tema} component={'img'} />
          </AspectRatio>

        </Box>

        <Box mx={1} px={0.5} >
          <Box fontSize='subtitle1.fontSize' fontWeight={500}>
            {`${actividade.tipo}: ${actividade.nome}`}
          </Box>
          <Box pt={1.5} alignItems='center' display='flex'>
            <Box color='error.dark' mr={1}>
              <PlaceRoundedIcon color='inherit' />
            </Box>
            <Typography color='textSecondary' gutterBottom variant='caption'>
              {actividade.local}
            </Typography>
          </Box>

          <Box pt={.5} pb={1} alignItems='center' display='flex'>
            <Box color='text.secondary' mr={1}>
              <ScheduleIcon color='inherit' />
            </Box>
            <Typography gutterBottom color='textSecondary' variant='caption'>
              {startEndDateToString(actividade.dataDeInicio, actividade.dataDeTermino)}
            </Typography>
          </Box>

        </Box>
      </Box>
    </Box>

  )
}