import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';


export default function BankInfo() {

	return (
		<Container>
			<Box pt={2} ml={2}>
				<Typography variant='h4'>
					<b>Informações bancárias da igreja</b>
				</Typography>
				<Box m={4} my={5} />
				<Grid container justifyContent='space-between'>
					<Grid item>
						<Box display='flex' alignItems='center'>
							<Box fontWeight="fontWeightBold">
								Titular da conta:
							</Box>
							<Box fontSize='body2.fontSize' color='text.secondary' ml={2}>
								Associação Jesus Cristo Vive
							</Box>
						</Box>
						<Box display='flex' alignItems='flex-start' mt={2}>
							<Box fontWeight="fontWeightBold">
								Banco Atlântico:
							</Box>
							<Box fontSize='body2.fontSize' color='text.secondary' ml={2} >
								12314495310001
							</Box>
						</Box>
						<Box display='flex' alignItems='center' mt={2} mb={2}>
							<Box fontWeight="fontWeightBold">
								IBAN:
							</Box>
							<Box fontSize='body2.fontSize' color='text.secondary' ml={2}>
								AO06.0055.0000.2314.4953.1016.6
							</Box>
						</Box>
					</Grid>
					<Grid item>
						<Box display='flex' alignItems='center' mt={2} >
							<PhoneRoundedIcon />
							<Box color='text.secondary' ml={2}>
								+244 932 771 036
							</Box>
						</Box>
					</Grid>
					<Box mb={4} />
					<Grid item>
						<Box display='flex' alignItems='center' mt={2} pb={1.5}>
							<EmailOutlinedIcon />
							<Box ml={1} color='text.secondary'>
								ministeriojesus.nossomodelo@gmail
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Container>
	)
}