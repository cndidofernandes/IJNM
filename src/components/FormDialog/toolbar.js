import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { Button, IconButton, Toolbar, Typography } from '@material-ui/core';

function ToolbarFormDialog({ title, isSubmitting, onClose }) {

    return (
        <Toolbar style={{paddingLeft: 4, paddingRight: 10}}>
            <IconButton onClick={onClose}>
                <ArrowBackIosRoundedIcon fontSize='small' />
            </IconButton>
            <Typography style={{flexGrow: 1}} variant='subtitle1'>{title}</Typography>
            <Button disabled={isSubmitting} type='submit' color='primary'>Publicar</Button>
        </Toolbar>
    )

}

export default ToolbarFormDialog;