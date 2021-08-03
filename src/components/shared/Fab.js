import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// import { Container } from './styles';

function MyFab({text="Add", onClick, style}) {
    return (
        <Fab style={style} variant="extended" color="primary" aria-label="add" onClick={onClick}>
            <AddIcon sx={{ mr: 1 }} />
            {text}
        </Fab>
    );
}

export default MyFab;