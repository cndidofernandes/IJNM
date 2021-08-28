import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Hidden } from "@material-ui/core";

import Slide from 'react-reveal/Slide';

import Head from 'next/head'

export default function Sobre(props) {

	React.useEffect(() => {
		props.setTabSelectedIndex(4);
	}, []);

	return (
		<>
			<Head>
				<title>Nossa História</title>
				<meta name="description" content='Conheça mais sobre a história da igreja jesus nosso modelo' />
			</Head>
			<Container>
				<Box my={4}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						minHeight: '35vh',
					}}
				>
					<Slide bottom cascade>
						<Grid container spacing={2} justifyContent='space-between'>

							<Grid item xs={12} md={6} lg={6}>
								<Box display='flex' component={'img'} width='100%' minHeight={350} bgcolor='#f0f0f0' src='/igreja/fundo1.jpg' />
							</Grid>
							<Grid item xs={12} md={6} lg={5}>
								<Hidden smUp>
									<br />
								</Hidden>
								<Typography align='left' variant='h4' gutterBottom>Conheça um pouco da nossa história</Typography>
								<Typography align='left' color='textSecondary' gutterBottom variant='body2'>
									Nos finais de 2009 um grupo de pessoas reunia-se na sala de uma casa a fim de fazer orações para adorar ao Senhor Jesus.
									Aos poucos foram-se juntando crianças, que por sua vez foram chamando os seus pais e o grupo começou a crescer.
									<br />
									<br />
									O grupo cresceu tanto que rapidamente estávamos criando filiais no País e, subitamente tivemos pessoas vindas de todos os lugares para viver o que Deus está a fazer na Igreja.
									Então no dia 2 de Novembro de 2012 é fundada a nossa <b>Igreja Pentecostal Jesus Nosso Modelo</b> pelo casal pastoral <b>Apostolo Stanley Idehen e Apostola Yolanda Natividade Dias Idehen</b> na província da Huíla, no Município do Lubango, no bairro Tchioco, na estrada do Estádio da Tundavala.
									<br />
									<br />
									Desde então, a Igreja vem ganhando almas para Cristo trazendo todos aqueles que estão perdidos nas trevas para os pés de Cristo, levando, através de igrejas locais, a salvação a muitas pessoas e gerações a fim de tornar-se numa das mais importantes denominações em Angola e em todo mundo.
								</Typography>
								<br />
								<Typography align='left' gutterBottom variant='body1'>
									Característica e princípios
								</Typography>
								<Typography align='left' color='textSecondary' gutterBottom variant='body2'>
									Esta igreja tem forma congregacional, cuja doutrina básica se dá na salvação mediante somente na fé, tendo como regra de fé e prática a Bíblia Sagrada, e que tem como princípio primordial a separação entre igreja e Estado.
								</Typography>
								<br />
								<Typography align='left' gutterBottom variant='body1'>
									Nosso objectivo
								</Typography>
								<Typography align='left' color='textSecondary' gutterBottom variant='body2'>
									O nosso grande e sincero desejo, é que as histórias vividas por Homens e Mulheres de Deus possam viver-se nesta geração e no futuro. Pois temos um legado deixado pelo Senhor Jesus Cristo, e continuado por Paulo, Lucas, Pedro e posteriormente por John Lake, John Alexandre Dowie, Maria Woodworth Etter, entre outros tantos que se entregaram para que Deus operasse maravilhosamente em suas gerações.
								</Typography>
							</Grid>

						</Grid>
					</Slide>
				</Box>
			</Container>

		</>
	)
}