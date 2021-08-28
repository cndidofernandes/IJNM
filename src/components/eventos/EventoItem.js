import React from "react";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import AspectRatio from "../shared/AspectRatio";
import startEndDateToString from "../../helpers/startEndDateToString";
import PlaceRoundedIcon from "@material-ui/icons/PlaceRounded";
import PanelItem from "../shared/PanelItem";

import ScheduleIcon from "@material-ui/icons/Schedule";

export default function EventoItem({ actividade, onDeleteClick, ...rest }) {
  const [hideImage, setHideImage] = React.useState(1);


  const onLoadImageFail = () => {
    setHideImage(0);
  }

  if (!actividade) {
    return <>Dados corrompidos</>;
  }

  return (
    <Box mb={4} {...rest}>
      <Box
        bgcolor="#fff"
        border="1px solid #f3f3f3"
        borderRadius={8}
        width="100%"
        height="100%">
        <Box position="relative">

          <AspectRatio width="100%" aspectRatio={1} mb={2} bgcolor="#fafafa" position="relative">
            <CardMedia
              style={{ borderRadius: 8, height: 194, opacity: hideImage }}
              image={`${process.env.IMAGE_BASE_URL}/${actividade.capaUrl}`}
              title={actividade.nome}
              component={"img"}
              onError={onLoadImageFail} />
          </AspectRatio>
          
        </Box>

        <Box mx={1} px={0.5}>
          <Box fontSize="subtitle1.fontSize" fontWeight={500}>
            {`${actividade.tipo}: ${actividade.nome}`}
          </Box>
          <Box pt={1.5} alignItems="center" display="flex">
            <Box color="error.dark" mr={1}>
              <PlaceRoundedIcon color="inherit" />
            </Box>
            <Typography color="textSecondary" gutterBottom variant="caption">
              {actividade.local}
            </Typography>
          </Box>

          <Box pt={0.5} pb={1} alignItems="center" display="flex">
            <Box color="text.secondary" mr={1}>
              <ScheduleIcon color="inherit" />
            </Box>
            <Typography gutterBottom color="textSecondary" variant="caption">
              {startEndDateToString(
                actividade.dataDeInicio,
                actividade.dataDeTermino
              )}
            </Typography>
          </Box>
        </Box>

        {onDeleteClick && <PanelItem onDeleteClick={onDeleteClick} />}
      </Box>
    </Box>
  );
}
