import React from "react";
import Box from "@material-ui/core/Box";
import TextBox from "../shared/TextBox";


export default function TextField({label, ...rest}){

	return(
		<>
			<Box fontSize='body2.fontSize' mb={2}>
				{label}
			</Box>
			<TextBox p={1} bgcolor='#fff' borderRadius={4} {...rest}/>
		</>				
	)
}

