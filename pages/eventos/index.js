import React, { useState, useContext, useEffect } from "react";
import Head from 'next/head'
import EventoItem from "../../src/components/eventos/EventoItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import SearchBox from "../../src/components/shared/SearchBox";

import api from '../../src/services/api';
import { getErrorBackend } from "../../src/helpers/errors";
import { AuthContext } from '../../src/contexts/AuthContext';
import { Button } from "@material-ui/core";

import MyFab from "../../src/components/shared/Fab";

import FormDialog from "../../src/components/FormDialog";

import mysqldb from "../../src/services/mysqldb";

import dateToString from "../../src/helpers/dateToString";

import CircularProgress from '@material-ui/core/CircularProgress';

const pageSize = 7;

export default function EventoPage(props) {
	const { isAuthenticated } = useContext(AuthContext);

	const [backend, setBackend] = useState({
		loading: false,
		data: props.data,
		error: null
	});


	const [values, setValues] = React.useState({
		categoria: '',
		searchText: ''
	});

	const [openFormDialog, setOpenFormDialog] = useState(false);

	const options = [
		'Culto',
		'Batismo',
		'Jejum',
		'Conferência',
		'Oração',
	]

	const handleCategoriaChange = (prop) => e => {
		const val = e.target.value;

		setValues((prev) => ({
			...prev,
			[prop]: val
		}))
	}

	const [searchBoxText, setSearchBoxText] = useState('');

	const onSearchBoxSubmitting = (e) => {
		e.preventDefault();

		if (searchBoxText === '') return;

		loadEventosFromApi(
			{
				name: searchBoxText,
			},
			{
				'404': `Não encontramos nenhum evento com o nome de "${searchBoxText}". Tente com um outro nome`,
			},
			true
		)

	}

	const loadMoreEventos = () => {

		loadEventosFromApi({
			offsetDate: backend?.data?.listEventos[backend?.data.listEventos.length - 1]?.criadoEm,
		})

	}

	const loadEventosFromApi = (params = {}, errors, isRestoreBackendData) => {

		setBackend({
			data: isRestoreBackendData ? { hasMore: false, listEventos: [], } : { ...backend.data },
			loading: true,
			error: null
		})

		api.get('/event', {
			params: {
				pageSize,
				...params
			},
		}).then(function ({ data }) {
			const res = data.success;

			setBackend({
				...backend,
				data: {
					hasMore: res.data.length >= pageSize,
					listEventos: isRestoreBackendData ? [...res.data] : [...backend?.data?.listEventos, ...res.data],
				},
				error: null,
				loading: false
			})

		}).catch(function (error) {

			setBackend({
				data: isRestoreBackendData ? { hasMore: false, listEventos: [], } : { ...backend.data },
				error: getErrorBackend(error, {
					'404': 'Sem mais eventos para carregar.',
					...errors
				}),
				loading: false
			})

		});

	}

	useEffect(() => {
		props.setTabSelectedIndex(0);
	}, []);


	return (

		<Box minHeight='70vh'>
			<Container>
				<Head>
					<title>Próximos Eventos</title>
					<meta name="description" content='Eventos, atividades que aconteceram, vão acontecer na igreja' />
				</Head>

				<Grid style={{ marginTop: 40 }} container justifyContent='space-between' alignItems={'center'}>
					<Grid item xs={12} md={4} lg={3}>
						<Box fontSize={'h4.fontSize'} fontWeight='fontWeightBold'>
							Próximos eventos
						</Box>
					</Grid>
					<Grid item xs={12} md={4} lg={4}>
						<Hidden implementation='css'>
							<Box mt={2} />
						</Hidden>
						<form onSubmit={onSearchBoxSubmitting}>
							<SearchBox
								inputProps={{
									onChange: (e) => {
										setSearchBoxText(e.target.value)
									},
									inputProps: {
										maxLength: 60,
										minLength: 1,
									},
								}}
							/>
						</form>
					</Grid>

					{/*<Grid item xs={12} md={4} lg={3}>
					<Hidden implementation='css'>
						<Box mt={2} />
					</Hidden>
					<SelectBox mr={0} value={values.categoria} options={options} onChange={handleCategoriaChange('categoria')} />

				</Grid>*/}
				</Grid>

				<Box mt={4}>

					<Grid container spacing={4}>
						<Content backend={backend} />
					</Grid>

					{backend?.data?.hasMore &&
						<Box textAlign='center' mt={2.5}>
							{!(backend.error && backend.error.status === 404) &&
								<Button disabled={backend.loading} onClick={loadMoreEventos} color='primary' size="large" variant='contained' style={{ border: 'none', boxShadow: 'none' }}>
									{backend.loading ? "Carregando..." : "Carregar mais"}
								</Button>
							}
							{backend.error &&
								<Box mt={1.5} fontSize='caption.fontSize' color={backend.error.status === 404 ? "text.secondary" : "error.main"}>{backend.error.message}</Box>
							}
						</Box>
					}

				</Box>
				{isAuthenticated &&
					(
						<>
							<MyFab style={{ float: 'right', marginTop: 8 * 3 }} text='Publicar música' onClick={() => { setOpenFormDialog(true) }} />
							<FormDialog
								open={openFormDialog}
								onClose={() => { setOpenFormDialog(false) }}
								title='Publicar música'
								apiUrl='/music'
								fields={[
									{ type: 'text', label: 'Titulo', name: 'titulo', placeholder: 'Digite o titulo da música' },
									{ type: 'url', label: 'Link', name: 'linkDaMusica', placeholder: 'Cole aqui o link da música' },
								]} />
						</>
					)
				}
				<Box mt={4} />
			</Container>
		</Box>
	)
}


function Content({ backend }) {

	if (backend.loading && !backend?.data.listEventos.length) {
		return (
			<Box width='100%' py={8} display='flex' alignItems='center' justifyContent='center'>
				<Box width='auto' mx='auto'>
					<CircularProgress />
				</Box>
			</Box>
		)
	} else if (backend.error && !backend.data.listEventos.length) {
		return (
			<Grid item xs={12} md={4} lg={3}>
				<Box fontSize='subtitle2.fontSize' color='text.secondary'>{backend.error.message}</Box>
			</Grid>
		)

	} else if (!backend?.data.listEventos.length) {
		return (
			<Grid item xs={12} md={4} lg={3}>
				<Box py={4} fontSize='subtitle2.fontSize' color='text.secondary'>Nenhum evento agendado no momento. Por favor, volte mais tarde.</Box>
			</Grid>
		)
	}

	return backend?.data.listEventos && backend?.data.listEventos.map((evento, key) => (
		<Grid key={key} item xs={12} sm={6} md={4}>
			<EventoItem actividade={evento} />
		</Grid>
	))

}

export async function getStaticProps() {
	const rows = await mysqldb.query(`SELECT * FROM evento WHERE dataDeInicio >= '${dateToString('Y-M-d h:i:00')}' ORDER BY id DESC LIMIT 0,7`);

	await mysqldb.end();

	const listEventos = rows.map((evento) => { return { ...evento } });

	return {
		props: {
			data: {
				hasMore: listEventos.length >= pageSize,
				listEventos
			}
		},
		//revalidate: 60 * 60 * 15
	}

}