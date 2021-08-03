import * as React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EventoItem from "../eventos/EventoItem";
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';


export default function EventSection(props) {

    return (
        <Box py={8} mb={10} width={'100%'} bgcolor='#f6f6f6'>
            <Box mb={4.5} fontWeight='fontWeightMedium' fontSize='h2.fontSize' textAlign='center'>
                Próximos eventos
            </Box>

            <Grid container justifyContent='space-evenly'>
                <Content />
            </Grid>
            <Box textAlign='center' mt={4.5}>
                <Button endIcon={<ArrowForwardRoundedIcon />} color='primary' size="large" component={'a'} href='/eventos' variant='contained' style={{ border: 'none', boxShadow: 'none' }} children='Ver mais' />
            </Box>
        </Box >
    );
}
function Content() {
    const [eventos, setEventos] = React.useState([
        { id: 12, nome: 'Unção', tipo: 'Culto', local: 'Tchihoco, Rua Direita do Estádio da Tundavala', dataDeTermino: '2021-02-28 07:00:00', dataDeInicio: '2021-02-28 07:00:00', capaUrl: "/igreja/evento1.jpg" },
        { id: 13, nome: 'Buscando pelo avivamento', tipo: 'Jejum e oração', local: 'Tchihoco, Rua Direita do Estádio da Tundavala', dataDeTermino: '2021-06-16 16:00:00', dataDeInicio: '2021-06-14 00:00:00', capaUrl: "/igreja/evento7.jpg" },
        { id: 14, nome: 'Mulheres com Propósito', tipo: 'Conferência', local: 'Tchihoco, Rua Direita do Estádio da Tundavala', dataDeTermino: '2021-07-10 08:00:00', dataDeInicio: '2021-07-10 08:00:00', capaUrl: "/igreja/evento3.jpg" },

    ]);

    if (!eventos && !eventos.length) {
        return (<Box fontSize='h6.fontSize' >Sem eventos de momento</Box>);
    }

    return eventos.map((evento, key) => (
        <Grid key={key} item xs={11} md={3}>
            <EventoItem actividade={evento} />
        </Grid>
    ))

}
