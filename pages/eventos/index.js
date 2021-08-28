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

import FormDialog from "../../src/components/eventos/form_dialog";

import mysqldb from "../../src/services/mysqldb";

import dateToString from "../../src/helpers/dateToString";

import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from "@material-ui/styles";
import DeleteItemDialog from "../../src/components/shared/DeleteItemDialog";
import Typography from "@material-ui/core/Typography";

import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyle = makeStyles((theme) => ({
	fab: {
		marginTop: theme.spacing(3),
	},
}));

const pageSize = 7;

export default function EventoPage(props) {
	const classes = useStyle();

	const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

	const { isAuthenticated } = useContext(AuthContext);
	const [itemToDelete, setItemToDelete] = useState(null);

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

	const handleDeleteClick = (item) => () => {
		setItemToDelete(item);
	};

	const handleDeleteClose = (item) => {
		setItemToDelete(null);
	};

	const handleDeletedItem = (deletedItem) => {
		setBackend({
			...backend,
			data: {
				...backend.data,
				listEventos: backend.data.listEventos.filter(
					(item) => deletedItem.id !== item.id
				),
			},
		});
	};


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
								disabled={backend.loading && !backend?.data.listEventos.length}
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
						<Content backend={backend} isAuthenticated={isAuthenticated} handleDeleteClick={handleDeleteClick} />
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
				{isAuthenticated && (
					<>
						<Box position='fixed' bottom={isMobile ? 8*3 : 8*6} right={isMobile ? 8*3 : 8*6}>
							<MyFab
								className={classes.fab}
								text="Publicar evento"
								onClick={() => {
									setOpenFormDialog(true);
								}}
							/>
						</Box>
						<FormDialog
							open={openFormDialog}
							onClose={() => {
								setOpenFormDialog(false);
							}}
							title="Adicionar um evento"
							apiUrl="/event"
							fields={{
								nome: {
									type: "text",
									label: "Nome",
									name: "nome",
									placeholder: "Escreva tema do evento",
								},
								tipo: {
									type: "text",
									label: "Tipo",
									name: "tipo",
									placeholder: "Tipo",
								},
								descricao: {
									type: "text",
									label: "Descricao",
									name: "descricao",
									placeholder:
										"Escreva a descrição do evento",
								},
								local: {
									type: "text",
									label: "Local",
									name: "local",
									placeholder: "Nome do local",
								},
								dataDeInicio: {
									type: "datetime-local",
									label: "Data de inicio",
									name: "dataDeInicio",
									placeholder: "dd/mm/aaaa",
								},
								dataDeTermino: {
									type: "datetime-local",
									label: "Data de Termino",
									name: "dataDeTermino",
									placeholder: "dd/mm/aaaa",
								},
							}}
						/>

						{/*Todo: apagar todas as imagens do evento*/}
						<DeleteItemDialog
							item={itemToDelete}
							title="Apagar este evento?"
							apiUrl="/event"
							onClose={handleDeleteClose}
							onSucess={handleDeletedItem}
						>
							<Typography variant="body2" color='textSecondary' gutterBottom>
								As pessoas não poderão mais ver este evento e as
								fotos associadas a ele. Esta operação é
								irreversível!
							</Typography>
							<EventoItem
								actividade={itemToDelete}
								mt={2}
								mb={2}
							/>
						</DeleteItemDialog>
					</>
				)}
				<Box mt={4} />
			</Container>
		</Box>
	)
}


function Content({ backend, isAuthenticated, handleDeleteClick }) {

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
			<EventoItem
				actividade={evento}
				onDeleteClick={
					isAuthenticated
						? handleDeleteClick(evento)
						: undefined
				}
			/>
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
		revalidate: 60 * 15
	}

}