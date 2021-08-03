import * as React from 'react';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';

export default function TextBox({ placeholder, endIcon, inputProps, ...rest }) {

	return (
		<Box borderRadius={25} pl={2} bgcolor={'#eceff1'} display='flex' flexGrow={1} flexDirection='row' alignItems='center' {...rest}>

			<InputBase
				style={{
					flexGrow: 1,
					width: '100%',
					paddingLeft: 0,
					paddingRight: 8,
				}}
				type='text'
				placeholder={placeholder}
				{...inputProps} />

			{endIcon}
		</Box>

	)
}