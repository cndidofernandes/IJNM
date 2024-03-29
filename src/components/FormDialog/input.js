import { Box, Typography } from '@material-ui/core';

function Input({ label, ...props }) {
  return (

    <Box style={{marginBottom: 12}} display='flex' alignItems='center'>
      
      <input
        style={
          {
            width: '100%',
            marginRight: 10,
            borderWidth: '0px',
            border: 'none',
            outline: 'none',
            fontWeight: 'normal',
            fontSize: '14px',
            letterSpacing: '0.25px'
          }
        }
        {...props}
      />
    </Box>

  );
}

export default Input;