import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useRouter } from 'next/router';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import InstagramIcon from '@material-ui/icons/Instagram';
import CallIcon from '@material-ui/icons/Call';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    socialIcons: {
        fontSize: 40,
        color: '#fff',
        textAlign: 'center',
    },
    icons: {
        fontSize: 24,
        marginBottom: 4,
        color: '#fff',
        textAlign: 'center',
    },
    buttonSytle: {
        textTransform: 'none',
        display: 'block',
        width: 'fit-content',
        textAlign: 'left',
        padding: 0,
        color: theme.palette.text.secondary,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 500
    }
}));


function Footer() {
    const router = useRouter();
    const classes = useStyle();
    return (
        <Box display='flex' px={2} flexDirection='column' alignItems='center' justifyContent='center' minHeight='90vh' bgcolor='#2e2e2e' py={2} mt={5}>

            <Grid container spacing={2} justifyContent='space-between'>
                <Grid item xs={12} sm={3} md={4}>
                    <Box my={2} display='flex' flexDirection='column' alignItems='center' justifyContent='center' >
                        <EmailRoundedIcon className={classes.icons} />
                        <Typography className={classes.text} variant='body1'>Email</Typography>
                        <Typography className={classes.text} style={{fontWeight: 400, marginTop: 4}} variant='caption'>ministeriojesus.nossomodelo@gmail.com</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2} md={4}>
                    <Box my={2} display='flex' flexDirection='column' alignItems='center' justifyContent='center' >
                        <CallIcon className={classes.icons} />
                        <Typography className={classes.text} variant='body1'>Ligue</Typography>
                        <Typography className={classes.text} style={{fontWeight: 400, marginTop: 4}} variant='caption'>+244 932 771 036</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} md={4}>
                    <Box my={2} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                        <LocationOnIcon className={classes.icons} />
                        <Typography className={classes.text} variant='body1'>Localização</Typography>
                        <Typography className={classes.text} style={{fontWeight: 400, marginTop: 4}} variant='caption'>Tchico, rua direita do estádio tundavala</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Box my={2} p={3} align='center' fontSize='caption.fontSize' >
                <Box display='flex' justifyContent='flex-start' alignItems='center' flexWrap={'wrap'}>
                    <IconButton component={'a'} color='secondary' href="https://www.facebook.com/ministeriojesus.nossomodelo" target="_blank" rel="noreferrer">
                        <FacebookIcon className={classes.socialIcons} />
                    </IconButton>
                    <Box component='span' color='green'>
                        <IconButton color='inherit' component={'a'} href="https://www.youtube.com/channel/UCNB5x7J3gTZ1rdzIT61rrpQ" target="_blank" rel="noreferrer">
                            <YouTubeIcon className={classes.socialIcons} />
                        </IconButton>
                    </Box>
                    <IconButton color='primary' component={'a'} href="https://www.instagram.com/minisjesusnossomodelo/" target="_blank" rel="noreferrer">
                        <InstagramIcon className={classes.socialIcons} />
                    </IconButton>
                </Box>

            </Box >

            <Box mb={1} p={2} px={3} color='#fff' component='span' fontSize='subtitle2.fontSize' fontWeight='fontWeightBold' textAlign='center'>
                Igreja Penteconstal Jesus Cristo Nosso Modelo © 2021
            </Box>
            <Typography variant='caption' className={classes.text} style={{fontWeight: 400, paddingBottom: 4}}>Todos os direitos reservados</Typography>

        </Box>
    );
}

export default Footer;