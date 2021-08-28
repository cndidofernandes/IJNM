import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import theme from '../../../theme';


const styles={
    width: '100%',
    // marginRight: 10,
    // borderWidth: '0px',
    // border: 'none',
    // outline: 'none',
    // color: theme.palette.text.secondary,
    // fontWeight: 'normal',
    // fontSize: '14px',
    // letterSpacing: '0.25px',

  }



function Input({ label,className, ...props }) {
  return (

    <Box style={{marginBottom: 12}} display='flex' alignItems='center'>
      
      <InputBase fullWidth
        style={className?undefined:styles}
        className={className}
        {...props}
      />
    </Box>

  );
}

export default Input;