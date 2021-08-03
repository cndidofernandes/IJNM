import React from "react";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from '@material-ui/core/InputBase';


import theme from '../../theme';

const classes = {
  inputSearch:{
  	flexGrow:1,
  	width:'100%',
  	border:'1px solid #f0f0f0',
  	borderRadius:4,
  	maxWidth:200,
  	// padding: theme.spacing(0,2),
  	// paddingRight: theme.spacing(1),
  	// paddingLeft: theme.spacing(1),

  	},
  	
};
  

export default function SelectBox({ value, options=[], onChange,...rest}){
	return(
		<Box {...rest}>
				<Select value={value}
						onChange={onChange} 
						placeholder={'Escolha uma categoria'}
						input={
				          	<InputBase style={classes.inputSearch} type='text' />
				          }>
			          <MenuItem value="">
			            <em>Tudo</em>
			          </MenuItem>
			          {
			          	options.map((option, index)=>{
			          		if(typeof option === 'string'){
			          			return <MenuItem key={index} value={option}>{option}</MenuItem>
			          		}
			          		return <MenuItem key={index} value={option.value}>{option.text}</MenuItem>
			          	})
			          }
	        	</Select>
		        

		
			
				
		</Box>
		)
}

// <TextField {...rest} maxWidth={220} bgcolor='#fff' border='1px solid #f0f0f0' borderRadius={4} placeholder='Escolha uma categoria'
// 				endIcon={
// 					<ArrowDropDownRoundedIcon/>
// 				}/>