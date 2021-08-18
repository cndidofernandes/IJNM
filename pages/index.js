import React, { useState } from "react";
import Box from "@material-ui/core/Box";

import Head from 'next/head'

import EventSection from "../src/components/home/EventSection";
import useWindowDimensions from "../src/helpers/hooks/useWindowDimensions";

import Button from '@material-ui/core/Button';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import { makeStyles } from "@material-ui/core";

import useMediaQuery from '@material-ui/core/useMediaQuery';

import IconButton from '@material-ui/core/IconButton';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

import Slide from 'react-reveal/Slide';

import mysqldb from "../src/services/mysqldb";

import dateToString from "../src/helpers/dateToString";


const useStyles = makeStyles(theme => ({
	responsiveSpace: {

		[theme.breakpoints.down('sm')]: {
			marginTop: theme.spacing(-13)
		}

	},
	socialIcons: {
		fontSize: 56,
		color: '#000',
		textAlign: 'center',
	},
}));

const SectionLayout = ({ title, description, containerBoxProps, contentBoxProps, buttonProps, imgProps, isMobile, isDefaultSideAnimate = true }) => {
	const dimensions = useWindowDimensions();

	const responsivePhotosSection = () => {
		return isMobile
			?
			{
				containerBox: {
					flexDirection: 'column-reverse',
				},
				img: {
					width: '100%'
				},
				contentBox: {
					width: '100%',
					alignItems: 'flex-start'
				},
			}
			:
			{

			}
	}

	const sideEffect = isDefaultSideAnimate ? { left: true } : { right: true }
	const oppositeEffect = isDefaultSideAnimate ? { right: true } : { left: true }

	return (
		<Box display='flex' p={0} m={0} {...containerBoxProps} {...responsivePhotosSection().containerBox}>

			<Slide {...sideEffect}>
				<Box px={isMobile ? 4 : 8} py={6} width='49.5vw' display='flex' flexDirection='column' justifyContent='center' alignItems='center' {...contentBoxProps} {...responsivePhotosSection().contentBox}>
					<Box mb={3} fontWeight='fontWeightBold' fontSize={isMobile ? 'h3.fontSize' : 'h1.fontSize'}>
						{title}
					</Box>
					<Box mb={2.5} fontSize='body1.fontSize' color='text.secondary'>
						{description}
					</Box>
					<Box display='flex' width='100%'>
						<Button disableElevation endIcon={<ArrowForwardRoundedIcon />} color='primary' size="large" component={'a'} href='#' variant='contained' {...buttonProps} />
					</Box>
				</Box>
			</Slide>
			<Slide {...oppositeEffect}>
				<img alt='igreja' width={(dimensions.width * 0.4939)} {...responsivePhotosSection().img} {...imgProps} />
			</Slide>

		</Box>
	)


}

export default function Home({ setTabSelectedIndex, events }) {
	const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
	const classes = useStyles();

	const [visibleSections, setVisibleSections] = useState({
		wellcome: true,
		citation: true,
		aboutUs: false,
		sermons: true,
		workships: true,
	})

	React.useEffect(() => {
		setTabSelectedIndex(5);
	}, []);

	return (
		<>
			<Head>
				<title>Igreja Jesus Nosso Modelo</title>
				<meta name="description" content='Catedral de milagres' />
			</Head>

			<Box width='100%' height='100vh' style={{ background: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)),  center / cover no-repeat url("/igreja/fundo4.jpg") fixed` }} bgcolor='#2e2e2e' className={classes.responsiveSpace} display='flex' mt={-14} alignItems='center' justifyContent='center' color='#fff'>
				<Slide bottom cascade>
					<Box>
						<Box p={1} pb={0} px={2} color='#fff' fontWeight='bold' fontSize={isMobile ? 'h3.fontSize' : 'h1.fontSize'} textAlign='center'>
							Igreja Jesus Nosso Modelo
						</Box>
						<Box p={1} pt={0} color='#fff' textAlign='center' fontSize={isMobile ? 'subtitle1.fontSize' : 'h4.fontSize'}>
							Catedral de milagres
						</Box>
					</Box>
				</Slide>
			</Box>


			<div>

				<Box display='flex' flexDirection='column' justifyContent='center' height={isMobile ? '70vh' : '90vh'} bgcolor='#f6f6f6'>

					<Box px={2} fontSize={isMobile ? 'body1.fontSize' : 'h3.fontSize'} sx={{ textAlign: 'center', fontWeight: 'regular', fontStyle: 'italic' }}>
						{'"Curai os enfermos, limpai os leprosos, ressuscitai os mortos, expulsai os demônios; de graça recebestes, de graça dai."'}
					</Box>

					<Slide bottom>
						<Box mt={1.5} textAlign='center'>
							<Box component='span' color='text.primary' mr={1}> - </Box>
							<Box component='span' fontSize='h6.fontSize' textAlign='center' color='secondary.main' fontWeight={500}>
								Mateus 10:8
							</Box>
						</Box>
					</Slide>

				</Box>

			</div>


			<Box width='100%'>

				<SectionLayout
					isMobile={isMobile}
					title='Saiba mais sobre nós'
					description={
						`O que começou apenas na sala de uma casa, actualmente é uma igreja com mais de 2.750 membros distribuídos em filiais por todo o país`
					}
					buttonProps={{
						href: '/sobre',
						children: 'Conhecer melhor'
					}}
					imgProps={{
						src: '/igreja/aboutus.jpg',
						alt: 'sobre'
					}}
				/>

				<SectionLayout
					isDefaultSideAnimate={false}
					isMobile={isMobile}
					title='Assista às nossas pregações'
					description={
						`Edifique a sua fé assistindo as nossas pregações todas as semanas de onde quer que esteja`
					}
					containerBoxProps={{
						flexDirection: 'row-reverse'
					}}
					buttonProps={{
						href: '/pregacoes',
						color: 'secondary',
						children: 'Assitir pregações'
					}}
					imgProps={{
						src: '/igreja/pregacao5.jpg',
						alt: 'pregações'
					}}
				/>

				<SectionLayout
					isMobile={isMobile}
					title='Ouça as nossas músicas de adoração'
					description={
						`Damos glória e louvor ao Senhor com músicas cantadas pelos nossos membros`
					}
					buttonProps={{
						href: '/musicas',
						children: 'Ouvir músicas'
					}}
					imgProps={{
						src: '/igreja/workshipt.jpg',
						alt: 'músicas'
					}}
				/>


			</Box>


			<EventSection events={events} isMobile={isMobile} />


			<Box width='100%' height='90vh' bgcolor='#fff' className={classes.responsiveSpace} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
				<Slide bottom cascade>
					<Box mb={3} fontWeight='fontWeightMedium' fontSize='h2.fontSize' textAlign='center'>
						Siga-nos nas redes socias
					</Box>
					<Box mb={5.5} fontSize='body1.fontSize' color='text.secondary' textAlign='center'>
						Fique conectado nas nossas redes sociais para saber as actualizações da igreja
					</Box>
					<Box display='flex' alignItems='center' justifyContent='space-around'>
						<IconButton component={'a'} color='secondary' href="https://www.facebook.com/ministeriojesus.nossomodelo" target="_blank" rel="noreferrer">
							<FacebookIcon style={{ color: '#1774eb' }} className={classes.socialIcons} />
						</IconButton>
						<Box component='span' color='green'>
							<IconButton color='inherit' component={'a'} href="https://www.youtube.com/channel/UCNB5x7J3gTZ1rdzIT61rrpQ" target="_blank" rel="noreferrer">
								<YouTubeIcon style={{ color: '#ec0100' }} className={classes.socialIcons} />
							</IconButton>
						</Box>
						<IconButton component={'a'} href="https://www.instagram.com/minisjesusnossomodelo/" target="_blank" rel="noreferrer">
							<InstagramIcon className={classes.socialIcons} />
						</IconButton>
					</Box>
				</Slide>
			</Box>

		</>
	)

}

export async function getStaticProps(ctx) {

	const rows = await mysqldb.query(`SELECT * FROM evento WHERE dataDeInicio >= '${dateToString('Y-M-d h:i:00')}' ORDER BY id DESC LIMIT 0,3`);

	await mysqldb.end();

	const nextEvents = rows.map((evento) => { return { ...evento } });

	return {
		props: {
			events: nextEvents
		}
	}

}