import React, { useState } from "react";
import Box from "@material-ui/core/Box";

import ScrollTrigger from 'react-scroll-trigger';

import EventSection from "../src/components/home/EventSection";
import useWindowDimensions from "../src/helpers/hooks/useWindowDimensions";

import Button from '@material-ui/core/Button';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import { Grid, makeStyles } from "@material-ui/core";

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';



import IconButton from '@material-ui/core/IconButton';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import InstagramIcon from '@material-ui/icons/Instagram';
import CallIcon from '@material-ui/icons/Call';
import LocationOnIcon from '@material-ui/icons/LocationOn';




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

const Layout = ({ title, description, containerBoxProps, contentBoxProps, buttonProps, imgProps, isMobile }) => {
	const dimensions = useWindowDimensions();

	const responsivePhotosSection = () => {
		return isMobile
			?
			{
				containerBox: {
					flexDirection: 'column-reverse'
				},
				img: {
					width: '100%'
				},
				contentBox: {
					width: '100%'
				},
			}
			:
			{

			}
	}

	return (
		<Box display='flex' p={0} m={0} {...containerBoxProps} {...responsivePhotosSection().containerBox}>

			<Box px={isMobile ? 4 : 8} py={6} width='49.5vw' display='flex' flexDirection='column' justifyContent='center' alignItems='center' {...contentBoxProps} {...responsivePhotosSection().contentBox}>
				<Box mb={3} fontWeight='fontWeightBold' fontSize={isMobile ? 'h3.fontSize' : 'h1.fontSize'}>
					{title}
				</Box>
				<Box mb={2.5} fontSize='body1.fontSize' color='text.secondary'>
					{description}
				</Box>
				<Box width='100%'>
					<Button style={{ alignSelf: (isMobile ? 'center' : 'flex-start') }} disableElevation endIcon={<ArrowForwardRoundedIcon />} color='primary' size="large" component={'a'} href='#' variant='contained' {...buttonProps} />
				</Box>
			</Box>
			<img alt='igreja' width={(dimensions.width * 0.4939)} {...responsivePhotosSection().img} {...imgProps} />

		</Box>
	)


}

export default function Home({ data, handleThemeTrigger, setTabSelectedIndex }) {
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


	const onEnterViewport = (section, theme) => ({ progress, velocity }) => {

		//console.log(section, theme, progress, velocity);

	}

	const onExitViewport = (section, theme) => ({ progress, velocity }) => {

		//console.log('logo', section, theme, progress, velocity);

		//handleThemeTrigger(theme);

		/*if (visibleSections[section] === true) {
			setVisibleSections({
				...visibleSections,
				[section]: false
			});
		}*/

	}


	//onSuccess={handleThemeTrigger('dark')} 

	return (
		<>
			<ScrollTrigger onEnter={onEnterViewport('wellcome', 'dark')} onExit={onExitViewport('wellcome', 'dark')}>
				<Box width='100%' height='100vh' style={{ background: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)),  center / cover no-repeat url("/igreja/fundo2.jpg") fixed` }} bgcolor='#2e2e2e' className={classes.responsiveSpace} display='flex' mt={-14} alignItems='center' justifyContent='center' color='#fff'>
					<Box>
						<Box p={1} px={2} color='#fff' fontWeight='bold' fontSize={isMobile ? 'h3.fontSize' : 'h1.fontSize'} textAlign='center'>
							Igreja Pentecostal Jesus Nosso Modelo
						</Box>
						<Box p={1} color='#fff' textAlign='center' fontSize={isMobile ? 'subtitle1.fontSize' : 'h5.fontSize'}>
							Um lugar onde a fé em Cristo, faz milagres
						</Box>
					</Box>
				</Box>
			</ScrollTrigger>
			<ScrollTrigger onEnter={onEnterViewport('citation', 'light')} onExit={onExitViewport('citation', 'light')}>
				<div>
					<Box display='flex' flexDirection='column' justifyContent='center' height={isMobile ? '70vh' : '90vh'} bgcolor='#f6f6f6'>
						<Box px={2} fontSize={isMobile ? 'body1.fontSize' : 'h3.fontSize'} sx={{ textAlign: 'center', fontWeight: 'regular', fontStyle: 'italic' }}>
							{'"Em meu nome expulsarão demónios, falarão novas línguas, pegarão nas serpentes; e se beberem alguma coisa mortífera não lhes fará dano algum; e porão as mãos sobre os enfermos, e os curarão."'}
						</Box>
						<Box mt={1.5} textAlign='center'>
							<Box component='span' color='text.primary' mr={1}> - </Box>
							<Box component='span' fontSize='h6.fontSize' textAlign='center' color='secondary.main' fontWeight={500}>
								Marcos 16:17-18
							</Box>
						</Box>
					</Box>
				</div>
			</ScrollTrigger>

			<Box width='100%'>

					<ScrollTrigger onEnter={onEnterViewport('aboutUs', 'light')} onExit={onExitViewport('aboutUs', 'light')}>
						<Layout
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

					</ScrollTrigger>


				<ScrollTrigger onEnter={onEnterViewport('sermons', 'light')} onExit={onExitViewport('sermons', 'light')}>
					<Layout
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
				</ScrollTrigger>

				<ScrollTrigger onEnter={onEnterViewport('sermons', 'light')} onExit={onExitViewport('sermons', 'light')}>
					<Layout
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
				</ScrollTrigger>

			</Box>

			<EventSection />

			<Box width='100%' height='90vh' bgcolor='#fff' className={classes.responsiveSpace} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
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

			</Box>


		</>
	)

}