import React from "react";

import Box from "@material-ui/core/Box";
import BankInfo from "../src/components/doar/BankInfo";
import SendConfirmForm from "../src/components/doar/SendConfirmForm";

export default function Doar(props) {

	React.useEffect(() => {
		props.setTabSelectedIndex(5);
	}, []);

	return (
		<>

			<Box height={4 * 8} />
			<BankInfo />
			<Box height={6 * 6} />
			<SendConfirmForm />
			<Box mb={4} />

		</>
	)
}