import React from "react";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

import Link from '../shared/Link';
import Menu from "./Menu";
import Tabs from "./top_appbar/Tabs";

import { useRouter } from "next/router";
import { IconButton } from "@material-ui/core";

export default function TopAppbar(props) {
	const router = useRouter();

	const appBarStyles = (router.route !== '/') ? ({ position: 'static', style: { color: '#000', backgroundColor: '#fff', borderBottom: '1px solid #eceff1' } }) : ({});
	const [open, setOpen] = React.useState(false);

	const handleToggle = () => {
		setOpen((prev) => !prev);
	};
	const handleClose = () => {
		setOpen(false)
	};


	return (
		<>
			{props.home && (<Box mb={6} />)}
			<Appbar elevation={0} position='static' {...props.config} {...appBarStyles}>
				<Container>
					<Toolbar>
						<Box flexGrow={1} color='inherit'>
							<Box maxWidth="fit-content" color='inherit'>
								<Link href='/' style={{ color: 'inherit' }}>
									<Box display='flex' alignItems='center' color='inherit'>
										<Box component={'img'} src='/logo_mini.png' alt='logo' width={44} height={44}/>
									</Box>
								</Link>
							</Box>
						</Box>
						<Hidden implementation='css' mdUp>
							<IconButton edge='start' color='inherit' onClick={handleToggle}>
								<MenuRoundedIcon />
							</IconButton>
						</Hidden>
						<Hidden implementation='css' smDown>
							<Tabs home={router.route === '/'} value={props.value} />
						</Hidden>

					</Toolbar>
				</Container>

			</Appbar>

			<Menu open={open} onClose={handleClose} />
		</>
	)
}