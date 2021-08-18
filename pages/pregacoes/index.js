import React, { useState, useContext, useEffect } from "react";

import PregacaoItem from "../../src/components/pregacao/PregacaoItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import SearchBox from "../../src/components/shared/SearchBox";
import Hidden from "@material-ui/core/Hidden";

import CircularProgress from '@material-ui/core/CircularProgress';

import MyFab from "../../src/components/shared/Fab";

import FormDialog from "../../src/components/FormDialog";

import { AuthContext } from '../../src/contexts/AuthContext';
import { getErrorBackend } from "../../src/helpers/errors";

import api from '../../src/services/api';
import { Button } from "@material-ui/core";

import mysqldb from "../../src/services/mysqldb";

const pageSize = 7;

export default function PregacaoPage(props) {

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

	return (
		<Box minHeight='70vh'>
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
							<Button disabled={backend.loading} onClick={loadMorePregacoes} color='primary' size="large" variant='contained' style={{ border: 'none', boxShadow: 'none' }}>
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
							<MyFab style={{ float: 'right', marginTop: 8 * 3 }} text='Publicar pregação' onClick={() => { setOpenFormDialog(true) }} />
							<FormDialog
								open={openFormDialog}
								onClose={() => { setOpenFormDialog(false) }}
								title='Publicar música'
								apiUrl='/sermons'
								fields={[
									{ type: 'text', label: 'Tema', name: 'tema', placeholder: 'Escreva o tema da pregação' },
									{ type: 'text', label: 'Pregador', name: 'pregador', placeholder: 'Escreva o nome do pregador' },
									{ type: 'text', label: 'Descrição', name: 'breveDescricao', placeholder: 'Em poucas palavras descreva a pregração' },
									{ type: 'url', label: 'Link Do Video', name: 'linkDoVideo', placeholder: 'Cole aqui o link da pregação' },
									{ type: 'date', label: 'Data', name: 'data', placeholder: 'Insira a data que a pregação foi feita' },
								]} />
						</>
					)
				}
				<Box mb={4} />
			</Container>
		</Box>
	)
}


function Content({ backend, showPregacaoDetail }) {
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
			<PregacaoItem pregacao={pregacao} showPregacaoDetail={showPregacaoDetail} />
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
		}
	}

}