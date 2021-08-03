import * as React from 'react';

import Link from '@material-ui/core/Link';

import Grid from '@material-ui/core/Grid';

import Box from '@material-ui/core/Box';


import AspectRatio from '../shared/AspectRatio';
import { CardMedia } from '@material-ui/core';

export default function JoinUs() {

    return (

        <Box height={'90vh'} bgcolor='#f6f6f6' display='flex' flexDirection='column' justifyContent='center'>
            <Box fontWeight='fontWeightMedium' fontSize='h2.fontSize' textAlign='center'>
                Venha adorar connosco
            </Box>
            <Box mt={1} fontSize='body2.fontSize' color='text.secondary' sx={{ textAlign: 'center', fontWeight: 'regular', }}>
                As nossas portas estão sempre abertas.<br /> Acompanhe os nossos ocultos de forma <Box component={Link} underline="none" href={'/pregações'} fontWeight={'fontWeightBold'} color='secondary.main' > online</Box> ou presencial
            </Box>

            <Grid sx={{ px: 1.5 }} container justifyContent='space-around'>
                <Grid item xs={12} md={4} lg={3}>
                    <Box textAlign='center' mt={4.5}>
                        <AspectRatio width='100%' aspectRatio={1} mb={2} bgcolor='#2e2e2e' position='relative' >
                            <CardMedia style={{ height: 200, borderRadius: 4 }} image={'http://localhost/igreja/igreja.jpg'} title={'igreja'} component={'img'} />
                        </AspectRatio>
                        <Box fontSize='body2.fontSize'>
                            Das 00:07 as 10
                        </Box>
                        <Box color='primary.main'  fontSize="0.82rem">
                            Lubango, Senhora do monte
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Box textAlign='center' mt={4.5}>
                        <AspectRatio width='100%' aspectRatio={1} mb={2} bgcolor='#2e2e2e' position='relative' >
                            <CardMedia style={{ height: 200, borderRadius: 4 }} image={'http://localhost/igreja/igreja.jpg'} title={'igreja'} component={'img'} />
                        </AspectRatio>
                        <Box fontSize='body2.fontSize'>
                            Terça às 18:00H
                        </Box>
                        <Box color='primary.main' fontSize="0.82rem">
                            ver outros horarios
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Box textAlign='center' mt={4.5}>
                        <AspectRatio width='100%' aspectRatio={1} mb={2} bgcolor='#2e2e2e' position='relative' >
                            <CardMedia style={{ height: 200, borderRadius: 4 }} image={'http://localhost/igreja/igreja.jpg'} title={'igreja'} component={'img'} />
                        </AspectRatio>
                        <Box fontSize='body2.fontSize'>
                            Quinta às 18:00H
                        </Box>
                        <Box color='primary.main' fontSize="0.82rem">
                            ver outros horarios
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

