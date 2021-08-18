import * as React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EventoItem from "../eventos/EventoItem";
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import Slide from 'react-reveal/Slide';


export default function EventSection(props) {

	return (
		<Box py={8} mb={10} width={'100%'} bgcolor='#f6f6f6'>
			<Slide bottom cascade>
				<Box mb={4.5} fontWeight='fontWeightMedium' fontSize='h2.fontSize' textAlign='center'>
					Próximos eventos
				</Box>

				<Grid container justifyContent={props.isMobile ? 'flex-start' : 'space-evenly'}>
					<Content events={props.events} />
				</Grid>

				<Box textAlign='center' mt={props?.events?.length ? 2 : 4.5}>
					<Button endIcon={<ArrowForwardRoundedIcon />} color='primary' size="large" component={'a'} href='/eventos' variant='contained' style={{ border: 'none', boxShadow: 'none' }}>
						Ver mais
					</Button>
				</Box>
			</Slide>

		</Box >
	);
}


function Content({ events }) {

	if (!events?.length) {
		return (
			<Grid item xs={12}>
				<Box textAlign='center' py={5} fontSize='subtitle2.fontSize' color='text.secondary'>Nenhum evento agendado no momento</Box>
			</Grid>
		)

	}

	return events?.map((evento, key) => (
		<Grid key={key} item xs={12} sm={6} md={4} lg={3}>
			<EventoItem actividade={evento} />
		</Grid>
	))

}
