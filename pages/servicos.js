import { Box } from '@material-ui/core';
import React from 'react';

// import { Container } from './styles';

function MinisteriosPage(props) {

    React.useEffect(() => {
		props.setTabSelectedIndex(3);
	}, []);

    return (
        <Box display='flex' alignItems='center' justifyContent='center' height='70vh' color="text.secondary" fontSize='h6.fontSize'>
            Em construção...
        </Box>
    );
}

export default MinisteriosPage;