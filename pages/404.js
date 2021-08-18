import { Box } from '@material-ui/core';
import React from 'react';

// import { Container } from './styles';

function Custom404({setTabSelectedIndex}) {

    React.useEffect(() => {
		setTabSelectedIndex(-1);
	}, [])

    return (
        <Box height={'100vh'} display='flex' justifyContent='center' alignItems='center' fontSize='h2.fontSize'>
            Ooophs...Página não encontrada
        </Box>
    )
}

export default Custom404;