import React from "react";
import Link from '@material-ui/core/Link';
import Appbar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

import Tabs from "./top_appbar/Tabs";
import makeStyles from "@material-ui/styles/makeStyles";

import theme from '../../theme';

const classes = {
	title: {
		textDecoration: 'none',
		[theme.breakpoints.down('sm')]: {
			fontSize: theme.typography.h6.fontSize
		},
	},
};


function ElevationScroll(props) {
	const { children, home, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 850,
		// target: window ? window() : undefined,
	});

	return home ?
		React.cloneElement(children, {
			color: trigger ? 'secondary' : 'transparent',
			style: {
				backgroundColor: trigger ? '#fff' : undefined,
				color: trigger ? '#000' : '#fff',
				borderBottom: trigger ? '1px solid #eceff1' : 'none',
				overflow: 'visible',
			}
		}) :
		children;
}

export default function TopAppbar(props) {

	const appBarStyles = !props.home ? ({ position: 'static', style: { color: '#000', backgroundColor: '#fff', borderBottom: '1px solid #eceff1' } }) : ({});
	return (
		<>
			{props.home && (<Box mb={6} />)}
			<ElevationScroll {...props}>
				<Appbar elevation={0} position='sticky' {...appBarStyles} >
					<Container>
						<Toolbar>
							<Hidden implementation='css' mdUp>
								<Button edge='start' color='inherit' variant='outlined' style={{ borderRadius: 8 }}>
									<MenuRoundedIcon />
								</Button>
							</Hidden>

							<Box component={Link} underline="none" href='/' width={48} height={48} bgcolor='primary.light' ml={1} mr={2} />
							<Box component={Link} underline="none" href='/' style={classes.title} fontSize={'h4.fontSize'} color='inherit' flexGrow={1} fontWeight={'fontWeightBold'} children="Lorem Ispum dolor" />
							<Hidden implementation='css' smDown>
								<Tabs home={props.home} value={props.value} />
							</Hidden>


						</Toolbar>
					</Container>


				</Appbar>
			</ElevationScroll>
		</>
	)
}
