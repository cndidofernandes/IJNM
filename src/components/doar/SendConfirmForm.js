import React, { useRef } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "./TextField";
import ImageShow from "./ImagePickerAndShow";
import { useForm } from "react-hook-form";

import FormData from 'form-data';

import api from '../../services/api';

import { getErrorBackend } from '../../helpers/errors';
import { Button } from "@material-ui/core";

import ResponseTip from "../shared/ResponseTip";


const fieldsNames = ['primeiro_nome', 'ultimo_nome', 'email', 'morada', 'comprovativo', 'valor', 'mensagem']

export default function SendConfirmForm() {
	const formRef = useRef(null);

	const [hiddenImagePreview, setHiddenImagePreview] = React.useState(false);
	const [backend, setBackend] = React.useState({
		loading: false,
		data: null,
		error: null
	});

	const { register, handleSubmit } = useForm();

	const myHandleSubmitting = async (data) => {

		setBackend({
			loading: true,
			data: null,
			error: null
		})

		try {

			const formData = new FormData();

			for (const name of fieldsNames) {
				formData.append(name, data[name]);

				if (name === 'comprovativo') formData.append(name, data.comprovativo[0]);
			}

			await api.post('/give', formData, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			});

			setBackend({
				data: {
					message: 'Obrigado! A sua doação foi feita com sucesso.'
				},
				error: null,
				loading: false
			})

			formRef.current.reset();

			setTimeout(() => {
				setBackend({
					loading: false,
					data: null,
					error: null
				})
			}, 11000);

		} catch (error) {

			setBackend({
                data: null,
                error: getErrorBackend(error, {
                    '500': 'Ocorreu um erro desconhecido ao fazer a doação. Por favor, tente novamente.',
					'400': 'Oophs! A foto do comprovativo é muito grande, tamanho máximo permitido é 2 MB.'
                }),
                loading: false
            })

		}

	}

	return (
		<Container>
			<Grid container>
				<Grid item xs={12} md={6} lg={5}>
					<Box p={4} bgcolor="#f3f3f3" borderRadius={6}>
						<Typography variant='h5'>
							Fazer uma Doação
						</Typography>
						<Box p={2} />

						<form ref={formRef} onSubmit={handleSubmit(myHandleSubmitting)} onReset={() => setHiddenImagePreview(true)} >
							<Grid container justifyContent='space-between'>
								<Grid item xs={12} md={6} lg={5}>
									<TextField mb={4} label='Primeiro Nome' placeholder='Seu primeiro nome'
										inputProps={{ required: true, inputProps: { minLength: 2, maxLength: 20 }, ...register(fieldsNames[0]) }} />
								</Grid>

								<Grid item xs={12} md={6} lg={5}>
									<TextField label='Último Nome' placeholder='Seu último nome' mb={4} inputProps={{ required: true, inputProps: { minLength: 2, maxLength: 20 }, ...register(fieldsNames[1]) }} />
								</Grid>

								<Grid item xs={12} >
									<TextField label='Email' inputProps={{ type: 'email', ...register(fieldsNames[2]) }} placeholder='Seu email' mb={4} />
								</Grid>
								<Grid item xs={12} >
									<TextField label='Morada' placeholder='Seu endereço' mb={4} inputProps={{ required: true, inputProps: { maxLength: 50 }, ...register(fieldsNames[3]) }} />
								</Grid>
								<Grid item xs={12}>
									<ImageShow inputProps={{ ...register(fieldsNames[4]) }} hidden={hiddenImagePreview} />
									<Box m={2} />
								</Grid>
								<Grid item xs={12} md={6} lg={5}>
									<TextField label='Valor depositado' placeholder='000,00 Akz' width='fit-content' mb={4}
										endIcon={
											<Box color='text.secondary'>Akz</Box>
										}

										inputProps={{ type: 'number', required: true, inputProps: { min: 50, max: 1000000000 }, ...register(fieldsNames[5]) }}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										label='Mensagem'
										placeholder='Sua mensagem'
										mb={4}
										inputProps={{
											required: true,
											inputProps: { minLength: 2 },
											component: 'textArea',
											rows: 5,
											multiline: true,
											...register(fieldsNames[6])
										}}
									/>
								</Grid>

							</Grid>
							<Box sx={{ display: 'flex', flexDirection: backend.loading ? 'row' : 'column', alignItems: backend.loading ? 'center' : 'start' }}>
								<Button disabled={backend.loading} type='submit' color='primary' variant='contained' size='large' style={{ boxShadow: 'none' }}>Enviar</Button>
								<Box mt={2}/>
								<ResponseTip backend={backend}/>
							</Box>
						</form>
					</Box>
				</Grid>
			</Grid>
		</Container>
	)
}

