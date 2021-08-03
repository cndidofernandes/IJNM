import React, { useState, useContext, useEffect } from "react";
import MusicaItem from "../src/components/musica/MusicaItem";
import SearchBox from "../src/components/shared/SearchBox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";

import MyFab from "../src/components/shared/Fab";

import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../src/services/api';

import FormDialog from "../src/components/FormDialog";

import { AuthContext } from '../src/contexts/AuthContext';
import { getErrorBackend } from "../src/helpers/errors";

function Content() {
	const [backend, setBackend] = useState({
		loading: false,
		data: {
			page: 1,
			pageSize: 6,
			hasMore: false,
			listMusicas: [],
		},
		error: null
	});

	const getMusicasFromApi = () => {

		setBackend({
			...backend,
			loading: true
		})

		api.get('/music', {
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
					listMusicas: [...backend.data.listMusicas, ...res.data],
				},
				loading: false
			})

		})
			.catch(function (error) {

				setBackend({
					...backend,
					error: getErrorBackend(error, {
						'404': 'Sem músicas no momento para poderes ouvir.'
					}),
					loading: false
				})

			});

	}

	useEffect(() => {

		//getMusicasFromApi()

		setBackend({
			...backend,
			data: {
				hasMore: false,
				page: backend.data.page++,
				pageSize: backend.data.pageSize,
				listMusicas: [
					{ "id": 53, "capaUrl": "/igreja/musica1.jpg", "titulo": "Maravilhoso Deus", "artista": "Banda", "linkDaMusica": "https://open.spotify.com/track/2XzdRRm5WZBnCm7fmZEafR?si=2649cdd8cbc249b3", "criadoEM": "2021-07-23T19:42:27.000Z" },
					{ "id": 52, "capaUrl": "/igreja/musica2.png", "titulo": "Yessua", "artista": "Banda", "linkDaMusica": "https://open.spotify.com/artist/6VvUpLELtkw8S1BEkEWym7", "criadoEM": "2021-07-23T18:45:36.000Z" },
					{ "id": 51, "capaUrl": "/igreja/musica3.jpg", "titulo": "Hosanna", "artista": "Banda", "linkDaMusica": "https://open.spotify.com/album/3ze1LwWKbEFnthXd0VxvS7", "criadoEM": "2021-07-23T18:43:54.000Z" },
					{ "id": 50, "capaUrl": "/igreja/musica4.jpg", "titulo": "I Surrender", "artista": "Banda", "linkDaMusica": "https://open.spotify.com/artist/7yQjrGrrDaA7vXTZTMFMoR", "criadoEM": "2021-07-23T18:42:15.000Z" },
					{ "id": 49, "capaUrl": "/igreja/musica6.jpg", "titulo": "Grace", "artista": "Banda", "linkDaMusica": "https://open.spotify.com/track/1urrG04mC0IopJD7vpKiiW", "criadoEM": "2021-07-23T18:36:23.000Z" },
					{ "id": 48, "capaUrl": "/igreja/musica5.jpeg", "titulo": "Som do céu", "artista": "Banda", "linkDaMusica": "https://open.spotify.com/track/0GKVeDYgvJyCMVafUCGjUf", "criadoEM": "2021-07-23T02:21:38.000Z" }
				],
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
				<Box fontSize='h6.fontSize'>{backend.error.message}</Box>)
			</Grid>
		)

	}

	return backend.data.listMusicas && backend.data.listMusicas.map((musica, key) => (
		<Grid key={key} item xs={12} sm={6} md={4} lg={3}>
			<MusicaItem musica={musica} />
		</Grid>
	))

}

export default function Musica(props) {
	const { isAuthenticated } = useContext(AuthContext);
	const [openFormDialog, setOpenFormDialog] = useState(false);

	React.useEffect(() => {
		props.setTabSelectedIndex(2);
	}, []);

	return (
		<>
			<Container>
				<Box mt={4} />
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
		</>
	)
}