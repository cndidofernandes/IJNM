import React, { useState, useContext, useEffect } from "react";

import PregacaoItem from "../src/components/pregacao/PregacaoItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import SearchBox from "../src/components/shared/SearchBox";
import Hidden from "@material-ui/core/Hidden";

import MyFab from "../src/components/shared/Fab";

import FormDialog from "../src/components/FormDialog";

import { AuthContext } from '../src/contexts/AuthContext';
import { getErrorBackend } from "../src/helpers/errors";

import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../src/services/api';

export default function PregacaoPage(props) {

	const { isAuthenticated } = useContext(AuthContext);

	const [openFormDialog, setOpenFormDialog] = useState(false);

	React.useEffect(() => {
		props.setTabSelectedIndex(1);
	}, []);

	return (
		<>
			<Container>
				<Box mt={4} />
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
						<SearchBox />
					</Grid>
				</Grid>
				<Box mt={4} />

				<Grid container spacing={4}>
					<Content />
				</Grid>

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
		</>
	)
}

function Content() {
	const [backend, setBackend] = useState({
		loading: false,
		data: {
			page: 1,
			pageSize: 6,
			hasMore: false,
			listPregacoes: [],
		},
		error: null
	});

	const getPregacoesFromApi = () => {

		setBackend({
			...backend,
			loading: true
		})

		api.get('/sermons', {
			params: {
				page: backend.data.page,
				pageSize: backend.data.pageSize
			},
		}).then(function ({ data }) {
			const res = data.success;

			setBackend({
				...backend,
				data: {
					hasMore: res.data.length >= backend.data.pageSize,
					page: backend.data.page++,
					pageSize: backend.data.pageSize,
					listPregacoes: [...backend.data.listPregacoes, ...res.data],
				},
				loading: false
			})

		})
			.catch(function (error) {

				setBackend({
					...backend,
					error: getErrorBackend(error, {
						'404': 'Sem pregações de momento.'
					}),
					loading: false
				})

			});

	}

	useEffect(() => {

		// getPregacoesFromApi()
		setBackend({
			...backend,
			data: {
				hasMore: false,
				page: backend.data.page++,
				pageSize: backend.data.pageSize,
				listPregacoes: [
					{
						"id": 2,
						"tema": "Não Busque Conselho do Impio",
						"pregador": "Apóstolo Stanley idehen",
						"data": "2021-07-17 23:00:00",
						"breveDescricao": "Apóstolo Stanley Idehen -Não Busque Conselho do Impio",
						"linkDoVideo": "https://www.facebook.com/ministeriojesus.nossomodelo/videos/986748928447929/",
						"criadoEm": "2021-07-23T19:10:44.000Z",
						"capaUrl": "/igreja/pregacao3.jpg"
					},
					{
						"id": 3,
						"tema": "Tome Decisões Sábias",
						"pregador": " Apóstolo Stanley idehen",
						"data": "2021-07-10 23:00:00",
						"breveDescricao": "Uma descricao",
						"linkDoVideo": "https://www.facebook.com/ministeriojesus.nossomodelo/videos/981682165621272/",
						"criadoEm": "2021-07-21T18:46:19.000Z",
						"capaUrl": "/igreja/pregacao4.jpg"
					},
					{
						"id": 4,
						"tema": " Crença",
						"pregador": " Apóstolo Stanley idehen",
						"data": "2021-07-01 23:00:00",
						"breveDescricao": "Uma descricao",
						"linkDoVideo": "https://www.facebook.com/ministeriojesus.nossomodelo/videos/974944892961666/",
						"criadoEm": "2021-07-21T18:46:19.000Z",
						"capaUrl": "/igreja/pregacao4.jpg"
					}

				]
			},
			loading: false
		})

	}, [])

	if (backend.loading) {
		return (
			<Box width='100%' py={8} display='flex' alignItems='center' justifyContent='center'>
				<Box width='auto' mx='auto'>
					<CircularProgress />
				</Box>
			</Box>
		)
	} else if (backend.error) {
		return (
			<Grid item xs={12} md={4} lg={3}>
				<Box fontSize='h6.fontSize'>{backend.error.message}</Box>
			</Grid>
		)
	}

	return backend.data.listPregacoes && backend.data.listPregacoes.map((pregacao, key) => (
		<Grid key={key} item xs={12} sm={6} md={4} lg={3}>
			<PregacaoItem pregacao={pregacao} />
		</Grid>
	))


}