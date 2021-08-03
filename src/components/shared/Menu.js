import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import RecordVoiceOverRoundedIcon from '@material-ui/icons/RecordVoiceOverRounded';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import { useRouter } from 'next/router';
import Link from '../shared/Link';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
	list: {
		width: '90vw',
	},
	icon: {
		color: 'rgba(0,0,0,.7)'
	},
	link: {
		color: '#000'
	}
}));


export default function Menu({ open, onClose }) {
	const classes = useStyles();
	const router = useRouter();
	const menuItems = [
		{ text: 'Eventos', icon: <EventRoundedIcon /> , link: '/eventos' },
		{ text: 'Pregações', icon: <RecordVoiceOverRoundedIcon /> , link: '/pregacoes' },
		{ text: 'Músicas', icon: <MusicNoteRoundedIcon /> , link: '/musicas' },
		// { text: 'Nossos Ministérios', icon: <InfoRoundedIcon /> , link: '/ministérios' },
		{ text: 'Nossa Liderança', icon: <PersonRoundedIcon /> , link: '/lideranca' },
		{ text: 'Nossos Serviços', icon: <ScheduleRoundedIcon /> , link: '/servicos' },
		{ text: 'Doar', icon: <AttachMoneyRoundedIcon /> , link: '/doar'}
	];

	const closeDrawer = event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		onClose();
	};
	
	const onLinkClick = (href) => event => {
		closeDrawer(event);
		router.push(href);
	};

	return (
		<Drawer anchor={'right'} open={open} onClose={closeDrawer}>
			<div
				className={classes.list}
				role="menu"
				onClick={closeDrawer}
				onKeyDown={closeDrawer} >
				<Box p={1} textAlign={'right'} display='flex' alignItems='center' justifyContent='space-between'>

					<Link href='/' style={{ color: 'inherit' }}>
						<Box px={1.5} display='flex' alignItems='center' color='inherit'>
							<Box component={'img'} src='/logo_mini.png' alt='logo' width={36} height={36} bgcolor='primary.light' />
						</Box>
					</Link>

					<IconButton size='medium' onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>
				<List>
					{menuItems.map((item) => (
						<ListItem button key={item.text} onClick={onLinkClick(item.link)} className={classes.link}>
							<ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
							<ListItemText primary={<Box m={1} fontSize='h6.fontSize' fontWeight={700}>{item.text}</Box>} />
						</ListItem>
					))}
				</List>
			</div>
		</Drawer>
	);
}