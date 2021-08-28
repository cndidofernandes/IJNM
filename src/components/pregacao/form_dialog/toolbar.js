import CloseIcon from '@material-ui/icons/Close';
import { Button, IconButton, Toolbar, Typography } from '@material-ui/core';


function ToolbarFormDialog({ title, isSubmitting, onClose }) {

    return (
        <Toolbar style={{paddingLeft: 4, paddingRight: 10}}>
            <IconButton onClick={onClose}>
                <CloseIcon fontSize='small' />
            </IconButton>
            <Typography style={{flexGrow: 1}} variant='subtitle1'>{title}</Typography>
        </Toolbar>
    )

}

export default ToolbarFormDialog;