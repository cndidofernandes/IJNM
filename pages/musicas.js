import React, { useState, useContext, useEffect } from "react";
import MusicaItem from "../src/components/musica/MusicaItem";
import SearchBox from "../src/components/shared/SearchBox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";

import MyFab from "../src/components/shared/Fab";

import api from "../src/services/api";

import FormDialog from "../src/components/musica/form_dialog";

import { AuthContext } from "../src/contexts/AuthContext";
import { getErrorBackend } from "../src/helpers/errors";
import { Button } from "@material-ui/core";

import mysqldb from "../src/services/mysqldb";
import Head from "next/head";
import DeleteItemDialog from "../src/components/shared/DeleteItemDialog";

import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/styles";

import useMediaQuery from '@material-ui/core/useMediaQuery';

const pageSize = 7;

const useStyle = makeStyles((theme) => ({
	fab: {
		marginTop: theme.spacing(3),
	},
}));

function Content({ backend, onDeleteClick, isAuthenticated }) {

	if (backend.loading && !backend?.data.listMusicas.length) {
		return (
			<Box width='100%' py={8} display='flex' alignItems='center' justifyContent='center'>
				<Box width='auto' mx='auto'>
					<CircularProgress />
				</Box>
			</Box>
		)
	} else if (backend.error && !backend.data.listMusicas.length) {
		return (
			<Grid item xs={12} md={4} lg={3}>
				<Box fontSize='subtitle2.fontSize' color='text.secondary'>{backend.error.message}</Box>
			</Grid>
		)

	} else if (!backend?.data.listMusicas.length) {
		return (
			<Box py={4} mx={2} fontSize='subtitle2.fontSize' color='text.secondary'>
				Sem músicas disponiveis para ouvires no momento. Por favor, volte mais tarde.
			</Box>
		)
	}

	return backend?.data.listMusicas && backend?.data.listMusicas.map((musica, key) => (
		<Grid key={key} item xs={12} sm={6} md={4} lg={3}>
			<MusicaItem
				musica={musica}
				onDeleteClick={isAuthenticated ? onDeleteClick(musica) : undefined}
			/>
		</Grid>
	))

}

export default function Musica(props) {
	const classes = useStyle();

	const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

	const { isAuthenticated } = useContext(AuthContext);
	const [openFormDialog, setOpenFormDialog] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	const [backend, setBackend] = useState({
		loading: false,
		data: props.data,
		error: null
	});

	const [searchBoxText, setSearchBoxText] = useState('');

	const onSearchBoxSubmitting = (e) => {
		e.preventDefault();

		if (searchBoxText === '') return;

		loadMusicasFromApi(
			{
				title: searchBoxText,
			},
			{
				'404': `Não encontramos nenhuma música com o nome de: "${searchBoxText}". Tente com um outro nome`,
			},
			true
		)

	}

	const loadMoreMusicas = () => {

		loadMusicasFromApi({
			offsetDate: backend?.data?.listMusicas[backend?.data.listMusicas.length - 1]?.criadoEm,
		})

	}

	const loadMusicasFromApi = (params = {}, errors, isRestoreBackendData) => {

		setBackend({
			data: isRestoreBackendData ? { hasMore: false, listMusicas: [], } : { ...backend.data },
			loading: true,
			error: null
		})

		api.get('/music', {
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
					listMusicas: isRestoreBackendData ? [...res.data] : [...backend?.data?.listMusicas, ...res.data],
				},
				error: null,
				loading: false
			})

		}).catch(function (error) {

			setBackend({
				data: isRestoreBackendData ? { hasMore: false, listMusicas: [], } : { ...backend.data },
				error: getErrorBackend(error, {
					'404': 'Sem mais músicas para carregar.',
					...errors
				}),
				loading: false
			})

		});

	}

	useEffect(() => {
		props.setTabSelectedIndex(2);
	}, [])

	const handleCreatedItem = (itemCreated) => {

		loadMusicasFromApi({
			title: itemCreated.titulo,
			pageSize: 1
		})

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
				listMusicas: backend.data.listMusicas.filter(
					(item) => deletedItem.id !== item.id
				),
			},
		});
	};

	return (
		<Box minHeight={'70vh'}>
			<Head>
				<title>Músicas</title>
				<meta name="description" content='Músicas toucadas e cantadas pela banda' />
			</Head>
			<Container>
				<Box mt={5} />
				<Grid container justifyContent='space-between' alignItems='center'>
					<Grid item xs={12} md={4} lg={3}>
						<Box fontSize={'h4.fontSize'} fontWeight='fontWeightBold'>
							Ouvir músicas
						</Box>
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<Hidden implementation='css' smUp>
							<Box mt={2} />
						</Hidden>
						<form onSubmit={onSearchBoxSubmitting}>
							<SearchBox
								disabled={backend.loading && !backend?.data.listMusicas.length}
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
					<Content backend={backend} onDeleteClick={handleDeleteClick} isAuthenticated={isAuthenticated} />
				</Grid>
				{backend?.data?.hasMore &&
					<Box textAlign='center' mt={2.5}>
						{!(backend.error && backend.error.status === 404) &&
							<Button disabled={backend.loading} onClick={loadMoreMusicas} color='primary' size="large" variant='contained' style={{ border: 'none', boxShadow: 'none' }}>
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
						<Box position='fixed' bottom={isMobile ? 8*3 : 8*6} right={isMobile ? 8*3 : 8*6}>
							<MyFab
								className={classes.fab}
								text="Publicar música"
								onClick={() => {
									setOpenFormDialog(true);
								}}
							/>
						</Box>
						<FormDialog
							open={openFormDialog}
							onSucess={handleCreatedItem}
							onClose={() => { setOpenFormDialog(false) }}
							title='Publicar música'
							apiUrl='/music'
							fields={{
								titulo: { type: 'text', label: 'Titulo', name: 'titulo', placeholder: 'Escreva titulo da música' },
								artista: { type: 'text', label: 'Titulo', name: 'artista', placeholder: 'Escreva o autor da música' },
								linkDaMusica: { type: 'url', label: 'Link', name: 'linkDaMusica', placeholder: 'Cole aqui o link da música' },
							}} />

						{/*Todo: apagar todas as imagens do evento*/}
						<DeleteItemDialog
							item={itemToDelete}
							title='Apagar esta música?'
							apiUrl='/music'
							onClose={handleDeleteClose}
							onSucess={handleDeletedItem}
						>
							<Typography variant="body2" color='textSecondary' gutterBottom>
								As pessoas não poderão mais ver esta música. Esta operação é
								irreversível
							</Typography>
							<MusicaItem musica={itemToDelete} mt={2} mb={2} />
						</DeleteItemDialog>
					</>
				)}
				<Box mb={4} />
			</Container>
		</Box>
	)
}

export async function getStaticProps() {
	const rows = await mysqldb.query('SELECT * FROM musica ORDER BY id DESC LIMIT 0,7');

	await mysqldb.end();

	const listMusicas = rows.map((musica) => { return { ...musica } });

	return {
		props: {
			data: {
				hasMore: listMusicas.length >= pageSize,
				listMusicas
			}
		},
		revalidate: 60 * 60 * 24
	}

}