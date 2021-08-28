import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';

const styles = {
  width: '100%',
}

function Input({ label, className, ...props }) {
  return (

    <Box style={{ marginBottom: 12 }} display='flex' alignItems='center'>

      <InputBase fullWidth
        style={className ? undefined : styles}
        className={className}
        {...props}
      />
    </Box>

  );
}

export default Input;