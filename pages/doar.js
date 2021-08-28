import React from "react";

import Box from "@material-ui/core/Box";
import BankInfo from "../src/components/doar/BankInfo";
import SendConfirmForm from "../src/components/doar/SendConfirmForm";


import { AuthContext } from "../src/contexts/AuthContext";
import { Button } from "@material-ui/core";

import Head from "next/head";

export default function Doar(props) {
	const { isAuthenticated } = React.useContext(AuthContext);


	React.useEffect(() => {
		props.setTabSelectedIndex(5);
	}, []);

	return (
		<>

			<Head>
				<title>Doar</title>
				<meta name="description" content='Doe qualquer coisa para igreja' />
			</Head>

			<Box height={3 * 8} />
			{isAuthenticated && (
				<Box display='flex' justifyContent='flex-end' px={3}>
					<Button style={{ borderRadius: 0 }} disableElevation size='medium' variant='contained' color='secondary' href="/admin/doacao">
						Ver doações feitas
					</Button>
				</Box>
			)
			}
			<BankInfo />
			<Box height={6 * 6} />
			<SendConfirmForm />
			<Box mb={4} />

		</>
	)
}