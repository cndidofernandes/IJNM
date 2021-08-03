import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';


export default function BankInfo(){

	return(
		<Container>
			<Box pt={2} ml={2}>
				<Typography variant='h4'>
					<b>Informações bancárias da igreja</b>
				</Typography>
				<Box m={4} my={5}/>
				<Grid container justifyContent='space-between'>
					<Grid item>
						<Box display='flex' alignItems='center'>
							<Box fontWeight="fontWeightBold" children='Titular da conta:' />
							<Box fontSize='body2.fontSize' color='text.secondary' ml={2} children='XXXXXX XXXXXXXXXXX XXXXX'/>
						</Box>
						<Box display='flex' alignItems='center'  mt={2}>
							<Box fontWeight="fontWeightBold"  children='IBAN:' />
							<Box fontSize='body2.fontSize' color='text.secondary' ml={2} children='AOA 06XXXXXX XXXXXXXXXXX XXXXX'/>
						</Box>
						<Box display='flex' alignItems='flex-start'  mt={2}>
							<Box fontWeight="fontWeightBold"  children='SWIFT:' />
							<Box fontSize='body2.fontSize' color='text.secondary' ml={2} children='1312Asda213121' mb={2}/>
						</Box>
					</Grid>
					<Grid item>
						<Box display='flex' alignItems='center' mt={2} >
							<PhoneRoundedIcon/>
							<Box color='text.secondary' ml={2} children='+244 932 771 036'  />
						</Box>
					</Grid>
					<Box mb={4}/>
					<Grid item>
						<Box display='flex' alignItems='center' mt={2} pb={1.5}>
							<EmailOutlinedIcon/>
							<Box ml={1} color='text.secondary' children='ministeriojesusnossomodelo@gmail.com'  />
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Container>
		)
}