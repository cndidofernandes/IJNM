import React, { useState, useContext, useEffect } from "react";

import PregacaoItem from "../../src/components/pregacao/PregacaoItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import SearchBox from "../../src/components/shared/SearchBox";
import Hidden from "@material-ui/core/Hidden";

import CircularProgress from '@material-ui/core/CircularProgress';

import MyFab from "../../src/components/shared/Fab";

import FormDialog from "../../src/components/pregacao/form_dialog";

import { AuthContext } from '../../src/contexts/AuthContext';
import { getErrorBackend } from "../../src/helpers/errors";

import api from '../../src/services/api';
import { Button } from "@material-ui/core";

import DeleteItemDialog from "../../src/components/shared/DeleteItemDialog";
import { makeStyles } from "@material-ui/styles";

import mysqldb from "../../src/services/mysqldb";

import Typography from "@material-ui/core/Typography";

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Head from 'next/head'

const pageSize = 7;

const useStyle = makeStyles((theme) => ({
	fab: {
		marginTop: theme.spacing(3),
	},
}));

export default function PregacaoPage(props) {
	const { isAuthenticated } = useContext(AuthContext);

	const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

	const [itemToDelete, setItemToDelete] = useState(null);
	const classes = useStyle();

	const [openFormDialog, setOpenFormDialog] = useState(false);

	const [backend, setBackend] = useState({
		loading: false,
		data: props.data,
		error: null
	});

	const [searchBoxText, setSearchBoxText] = useState('');

	const onSearchBoxSubmitting = (e) => {
		e.preventDefault();

		if (searchBoxText === '') return;

		loadPregacoesFromApi(
			{
				topic: searchBoxText,
			},
			{
				'404': `Não encontramos nenhuma pregação com o nome de: "${searchBoxText}".  Tente com um outro nome`,
			},
			true
		)

	}

	const loadMorePregacoes = () => {

		loadPregacoesFromApi({
			offsetDate: backend?.data?.listPregacoes[backend?.data.listPregacoes.length - 1]?.criadoEm,
		})

	}

	const loadPregacoesFromApi = (params = {}, errors, isRestoreBackendData) => {

		setBackend({
			data: isRestoreBackendData ? { hasMore: false, listPregacoes: [], } : { ...backend.data },
			loading: true,
			error: null
		})

		api.get('/sermons', {
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
					listPregacoes: isRestoreBackendData ? [...res.data] : [...backend?.data?.listPregacoes, ...res.data],
				},
				error: null,
				loading: false
			})

		}).catch(function (error) {

			setBackend({
				data: isRestoreBackendData ? { hasMore: false, listPregacoes: [], } : { ...backend.data },
				error: getErrorBackend(error, {
					'404': 'Sem mais pregações para carregar.',
					...errors
				}),
				loading: false
			})

		});

	}

	useEffect(() => {
		props.setTabSelectedIndex(1);
	}, [])

	const handleCreatedItem = (itemCreated) => {
		/*setBackend({
			...backend,
			data: {
				...backend.data,
				listPregacoes: [...backend.data.listPregacoes, itemCreated]
			},
		});*/
	};

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
				listPregacoes: backend.data.listPregacoes.filter(
					(item) => deletedItem.slug !== item.slug
				),
			},
		});
	};

	return (
		<Box minHeight='70vh'>
			<Head>
				<title>Assistir pregações</title>
				<meta name="description" content='Pregações, seremos, reflexões sobre a palavra de Deus' />
			</Head>
			<Container>
				<Box mt={5} />
				<Grid container justifyContent='space-between' alignItems='center'>
					<Grid item xs={12} md={4} lg={3}>
						<Box fontSize={'h4.fontSize'} fontWeight='fontWeightBold'>
							Assistir pregações
						</Box>
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<Hidden implementation='css'>
							<Box mt={2} />
						</Hidden>
						<form onSubmit={onSearchBoxSubmitting}>
							<SearchBox
								disabled={backend.loading && !backend?.data.listPregacoes.length}
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
				</Grid>
				<Box mt={4} />

				<Grid container spacing={4}>
					<Content backend={backend} handleDeleteClick={handleDeleteClick} isAuthenticated={isAuthenticated} />
				</Grid>

				{backend?.data?.hasMore &&
					<Box textAlign='center' mt={2.5}>
						{!(backend.error && backend.error.status === 404) &&
							<Button disabled={backend.loading} onClick={loadMorePregacoes} color='primary' size="large" variant='contained' style={{ border: 'none', boxShadow: 'none' }}>
								{backend.loading ? "Carregando..." : "Carregar mais"}
							</Button>
						}
						{backend.error &&
							<Box mt={1.5} fontSize='caption.fontSize' color={backend.error.status === 404 ? "text.secondary" : "error.main"}>{backend.error.message}</Box>
						}
					</Box>
				}

				{isAuthenticated && (
					<>
						<Box position='fixed' bottom={isMobile ? 8 * 3 : 8 * 6} right={isMobile ? 8 * 3 : 8 * 6}>
							<MyFab
								className={classes.fab}
								text="Publicar pregação"
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
							onSucess={handleCreatedItem}
							title="Adicionar uma pregação"
							apiUrl="/sermons"
							fields={{
								tema: {
									type: "text",
									label: "Tema",
									name: "tema",
									placeholder: "Escreva o tema da pregação",
								},
								pregador: {
									type: "text",
									label: "Pregador",
									name: "pregador",
									placeholder: "Nome do pregador",
								},
								data: {
									type: "datetime-local",
									label: "Data",
									name: "data",
									placeholder: "dd/mm/aaaa",
								},
								breveDescricao: {
									type: "text",
									label: "Descrição",
									name: "breveDescricao",
									placeholder: "Em poucas palavras descreva a pregração",
								},
								linkDoVideo: {
									type: 'url',
									label: "Link Do Video",
									name: "linkDoVideo",
									placeholder: "Cole aqui o link da pregação",
								},
							}}
						/>

						<DeleteItemDialog
							item={itemToDelete}
							title="Apagar esta Pregação?"
							apiUrl="/sermons"
							onClose={handleDeleteClose}
							onSucess={handleDeletedItem}
						>
							<Typography variant="body2" color='textSecondary' gutterBottom>
								As pessoas não poderão mais ver esta pregação e
								os items associados a ele. Esta operação é
								irreversível!
							</Typography>
							<PregacaoItem
								pregacao={itemToDelete}
								mt={2}
								mb={2}
							/>
						</DeleteItemDialog>
					</>
				)}
				<Box mb={4} />
			</Container>
		</Box>
	)
}


function Content({ backend, handleDeleteClick, isAuthenticated }) {
	if (backend.loading && !backend?.data.listPregacoes.length) {
		return (
			<Box width='100%' py={8} display='flex' alignItems='center' justifyContent='center'>
				<Box width='auto' mx='auto'>
					<CircularProgress />
				</Box>
			</Box>
		)
	} else if (backend.error && !backend.data.listPregacoes.length) {
		return (
			<Grid item xs={12} md={4} lg={3}>
				<Box fontSize='subtitle2.fontSize' color='text.secondary'>{backend.error.message}</Box>
			</Grid>
		)

	} else if (!backend?.data.listPregacoes.length) {
		return (
			<Grid item xs={12} md={4} lg={3}>
				<Box py={4} fontSize='subtitle2.fontSize' color='text.secondary'>Sem pregações para assistir no momento. Por favor, volte mais tarde.</Box>
			</Grid>
		)
	}

	return backend?.data.listPregacoes && backend?.data.listPregacoes.map((pregacao, key) => (
		<Grid key={key} item xs={12} sm={6} md={4} lg={3}>
			<PregacaoItem pregacao={pregacao} onDeleteClick={isAuthenticated ? handleDeleteClick(pregacao) : undefined} />
		</Grid>
	))

}


export async function getStaticProps() {
	const rows = await mysqldb.query('SELECT * FROM pregacao ORDER BY id DESC LIMIT 0,7');

	await mysqldb.end();

	const listPregacoes = rows.map((pregacao) => { return { ...pregacao } });

	return {
		props: {
			data: {
				hasMore: listPregacoes.length >= pageSize,
				page: 1,
				pageSize: 6,
				listPregacoes
			}
		},
		revalidate: 60 * 15
	}

}