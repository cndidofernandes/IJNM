import React from 'react';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

export default function PanelItem({onDeleteClick, ...rest}){
	
	return(
		<Box {...rest} width={'100%'} bgcolor='#fafafa' borderBottom={'2px #eceff1 solid'} textAlign="right" display='flex' alignItems='center'>
			<Box ml={2} fontSize={'caption'} textAlign='left' fontWeight={700} color="text.secondary" flexGrow={1}>
				Operações
			</Box>
			<div>
				<IconButton onClick={onDeleteClick}>
				<DeleteOutlinedIcon />
				</IconButton>	
			</div>
			
		</Box>
		)
}