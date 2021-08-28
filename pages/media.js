import React, { useState, useContext, useEffect } from "react";
import Head from 'next/head'
import GaleriaItem from "../src/components/media/GaleriaItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import SearchBox from "../src/components/shared/SearchBox";

import api from '../src/services/api';
import { getErrorBackend } from "../src/helpers/errors";
import { Button } from "@material-ui/core";

import mysqldb from "../src/services/mysqldb";

import CircularProgress from '@material-ui/core/CircularProgress';

const pageSize = 10;

export default function MediaPage(props) {
	const [backend, setBackend] = useState({
		loading: false,
		data: props.data,
		error: null
	});

	const [searchBoxText, setSearchBoxText] = useState('');

	const onSearchBoxSubmitting = (e) => {
		e.preventDefault();

		if (searchBoxText === '') return;

		loadEventosFromApi(
			{
				name: searchBoxText,
			},
			{
				'404': `Não encontramos nenhum evento com o nome de: "${searchBoxText}". Tente com um outro nome`,
			},
			true
		)

	}

	const loadMoreEventos = () => {

		loadEventosFromApi({
			offsetDate: backend?.data?.listEventosWithMedia[backend?.data.listEventosWithMedia.length - 1]?.criadoEm,
		})

	}

	const loadEventosFromApi = (params = {}, errors, isRestoreBackendData) => {

		setBackend({
			data: isRestoreBackendData ? { hasMore: false, listEventosWithMedia: [], } : { ...backend.data },
			loading: true,
			error: null
		})

		api.get('/media', {
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
					listEventosWithMedia: isRestoreBackendData ? [...res.data] : [...backend?.data?.listEventosWithMedia, ...res.data],
				},
				error: null,
				loading: false
			})

		}).catch(function (error) {

			setBackend({
				data: isRestoreBackendData ? { hasMore: false, listEventosWithMedia: [], } : { ...backend.data },
				error: getErrorBackend(error, {
					'404': 'Sem mais eventos para carregar.',
					...errors
				}),
				loading: false
			})

		});

	}

	useEffect(() => {
		props.setTabSelectedIndex(3);
	}, []);


	return (

		<Box minHeight='70vh'>
			<Container>
				<Head>
					<title>Galeria dos eventos</title>
					<meta name="description" content='Imagens descrevendo o que aconteceu nos eventos' />
				</Head>
				<Box mt={5} />
				<Grid container justifyContent='space-between' alignItems={'center'}>
					<Grid item xs={12} md={4} lg={3}>
						<Box fontSize={'h4.fontSize'} fontWeight='fontWeightBold'>
							Galeria dos eventos
						</Box>
					</Grid>
					<Grid item xs={12} md={4} lg={4}>
						<Hidden implementation='css'>
							<Box mt={2} />
						</Hidden>
						<form onSubmit={onSearchBoxSubmitting}>
							<SearchBox
								disabled={backend.loading && !backend?.data.listEventosWithMedia.length}
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
				<Box mt={4} />
			</Container>
		</Box>

	)
}


function Content({ backend }) {

	if (backend.loading && !backend?.data.listEventosWithMedia.length) {
		return (
			<Box width='100%' py={8} display='flex' alignItems='center' justifyContent='center'>
				<Box width='auto' mx='auto'>
					<CircularProgress />
				</Box>
			</Box>
		)
	} else if (backend.error && !backend.data.listEventosWithMedia.length) {
		return (
			<Grid item xs={12} md={4} lg={3}>
				<Box fontSize='subtitle2.fontSize' color='text.secondary'>{backend.error.message}</Box>
			</Grid>
		)

	} else if (!backend?.data.listEventosWithMedia.length) {
		return (
			<Grid item xs={12} md={4} lg={3}>
				<Box py={4} fontSize='subtitle2.fontSize' color='text.secondary'>Nenhum evento com media foi encontrado. Por favor, volte mais tarde.</Box>
			</Grid>
		)
	}

	return backend?.data.listEventosWithMedia && backend?.data.listEventosWithMedia.map((evento, key) => (
		<Grid key={key} item xs={12} sm={6} md={3}>
			<GaleriaItem actividade={evento} />
		</Grid>
	))

}

export async function getStaticProps() {
	const rows = await mysqldb.query(`SELECT DISTINCT evento.* FROM fotos_evento INNER JOIN evento ON fotos_evento.idEvento = evento.id LIMIT 0,10`);

	await mysqldb.end();

	const listEventosWithMedia = rows.map((evento) => { return { ...evento } });

	return {
		props: {
			data: {
				hasMore: listEventosWithMedia.length >= pageSize,
				listEventosWithMedia
			}
		},
		revalidate: 60 * 60 * 15
	}

}