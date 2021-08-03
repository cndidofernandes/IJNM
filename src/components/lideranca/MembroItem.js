import React from "react";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import AspectRatio from "../shared/AspectRatio";

import { makeStyles } from "@material-ui/styles";
import { Avatar } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  cover: {
    borderRadius: 8,
    height: 380,
    [theme.breakpoints.up('lg')]: {
      height: 380,
    },
    [theme.breakpoints.up('xl')]: {
      height: 380,
    },
  },
}));



export default function MembroItem({ membro }) {
  const classes = useStyle();

  if (!membro) {
    return (<>Dados Corrompidos</>);
  }

  return (
    <Box mb={6}>
      <Avatar style={{ height: 192, width: 192, marginLeft: 'auto', marginRight: 'auto' }} alt={membro.nome} src={membro.foto} />
      <Box mt={2} textAlign="center" fontSize='h6.fontSize' fontWeight='fontWeightBold' children={membro.nome} />
      <Box textAlign="center" fontSize='body1.fontSize' color='text.secondary' children={membro.funcao} />

    </Box>
  )
}