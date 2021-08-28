import React from "react";
import TextBox from "./TextBox";

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Box } from "@material-ui/core";

export default function SearchBox({ value, onChange, disabled, ...rest }) {

	return (
		<Box display='flex'>
			<TextBox {...rest} placeholder='pesquisar' bgcolor='#fff' border='1px solid #f0f0f0' borderRadius={0} pr={1} />
			<IconButton disabled={disabled} size='small' style={{ backgroundColor: '#000', color: '#fff', borderRadius: 0, paddingLeft: 14, paddingRight: 14 }} type='submit'>
				<SearchIcon />
			</IconButton>
		</Box>
	)
}

