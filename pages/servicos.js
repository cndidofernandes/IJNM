import { Box } from '@material-ui/core';
import React from 'react';

import Head from "next/head";

// import { Container } from './styles';

function MinisteriosPage(props) {

    React.useEffect(() => {
        props.setTabSelectedIndex(4);
    }, []);

    return (
        <Box display='flex' alignItems='center' justifyContent='center' height='70vh' color="text.secondary" fontSize='h6.fontSize'>
            <Head>
                <title>Horários de cultos</title>
                <meta name="description" content='Horas e dias do culto' />
            </Head>
            Em construção...
        </Box>
    );
}

export default MinisteriosPage;