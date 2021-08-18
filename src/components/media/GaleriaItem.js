import React from "react";
import Link from '@material-ui/core/Link';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import AspectRatio from "../shared/AspectRatio";
import startEndDateToString from "../../helpers/startEndDateToString";
import ImageIcon from '@material-ui/icons/Image';

import ScheduleIcon from '@material-ui/icons/Schedule';

import { useRouter } from "next/router";

import slugify from "slugify";
import { CardActionArea } from "@material-ui/core";

export default function GaleriaItem({ actividade, ...rest }) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  if (!actividade) {
    return (<>Dados corrompidos</>);
  }


  return (

    <Box mb={4}>
      <CardActionArea onClick={() => { router.push(`/eventos/${actividade.slug}`) }}>
        <Box bgcolor='#fff' border='1px solid #f3f3f3' borderRadius={8} width='100%' height='100%'>
          <Box position='relative' component={Link} underline="none" href={actividade.linkDoVideo}>
            <AspectRatio width='100%' aspectRatio={1} mb={2} bgcolor='#fafafa' position='relative'>
              <CardMedia style={{ height: 194, }} image={actividade.capaUrl} title={actividade.tema} component={'img'} />
            </AspectRatio>
          </Box>

          <Box mx={1} px={0.5} >

            <Box alignItems='center' display='flex'>
              <Box color='text.secondary' mr={0.5}>
                <ImageIcon color='primary' />
              </Box>

              <Box fontSize='subtitle1.fontSize' fontWeight={500}>
                {`${actividade.nome}`}
              </Box>
            </Box>

            <Box pl={0.4} pt={.5} pb={1} alignItems='center' display='flex'>
              <Typography gutterBottom color='textSecondary' variant='caption'>
                {startEndDateToString(actividade.dataDeInicio, actividade.dataDeTermino)}
              </Typography>
            </Box>

          </Box>
        </Box>
      </CardActionArea>
    </Box>

  )
}