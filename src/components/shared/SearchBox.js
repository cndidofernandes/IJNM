import React from "react";
import TextBox from "./TextBox";

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBox({value, onChange, ...rest}){ 

	return(
		<>
			<TextBox {...rest} placeholder='pesquisar' bgcolor='#fff' border='1px solid #f0f0f0' borderRadius={8} pr={1} endIcon={
				<IconButton size='small' style={{color: '#000'}}>
					<SearchIcon/>
				</IconButton>
			}/>
		</>
		)
}

