import React, { useState, useContext, useEffect } from "react";
import MusicaItem from "../src/components/musica/MusicaItem";
import SearchBox from "../src/components/shared/SearchBox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from '@material-ui/core/CircularProgress';

import MyFab from "../src/components/shared/Fab";

import api from '../src/services/api';

import FormDialog from "../src/components/FormDialog";

import { AuthContext } from '../src/contexts/AuthContext';
import { getErrorBackend } from "../src/helpers/errors";
import { Button } from "@material-ui/core";

import mysqldb from "../src/services/mysqldb";
import Head from "next/head";

const pageSize = 7;

function Content({ backend }) {

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
			<MusicaItem musica={musica} />
		</Grid>
	))

}

export default function Musica(props) {
	const { isAuthenticated } = useContext(AuthContext);
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
					<Content backend={backend} />
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
		}
	}

}