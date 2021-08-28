import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


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