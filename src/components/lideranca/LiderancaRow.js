import React from "react";

import Box from "@material-ui/core/Box";

import Grid from "@material-ui/core/Grid";
import MembroItem from "./MembroItem";


export default function LiderancaRow({funcao}){

  if(!funcao){
    return (<>Dados Corrompidos</>);
  }

	return(
		<Box py={4}>
      <Box fontSize='h4.fontSize' textAlign='center' fontWeight='fontWeightRegular' children={funcao.funcao} mb={4}/>
      <Grid container spacing={4} justifyContent='center'>
        <Content membros={funcao.membros}/>
      </Grid>
        

		</Box>
		)
}



function Content({membros}){

  if(!membros && !membros.length){
    return (<Box fontSize='h6.fontSize' >Sem membros de momento</Box>);
  }

  return membros.map((membro, key)=>(
      <Grid key={membro.id}  item xs={12} md={4}  lg={3}>
        <MembroItem membro={membro}/>
      </Grid>
    ))

} 