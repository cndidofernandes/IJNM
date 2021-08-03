import React from "react";
import TopAppbar from "../src/components/shared/TopAppbar";
import Footer from "../src/components/shared/footer";
import SelectBox from "../src/components/shared/SelectBox";
import EventoItem from "../src/components/eventos/EventoItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import SearchBox from "../src/components/shared/SearchBox";



export default function EventoPage(props) {
	const [values, setValues] = React.useState({
		categoria: '',
		searchText: ''
	});
	const options = [
		'Opcao 1',
		'Opcao 2',
		'Opcao 3',
		'Opcao 4',
		'Opcao 5',
	]

	const handleCategoriaChange = (prop) => e => {
		const val = e.target.value;
	
		setValues((prev) => ({
			...prev,
			[prop]: val
		}))
	}


	React.useEffect(() => {
		props.setTabSelectedIndex(0);
	}, []);



	return (
		
		<Container>
			<Grid container justifyContent='space-between' alignItems={'center'}>
				<Grid item xs={12} md={4} lg={3}>
					<Box my={3} fontSize={'h4.fontSize'} fontWeight='fontWeightBold' children="Eventos" />
				</Grid>
				<Grid item xs={12} md={4} lg={4}>
					<Hidden implementation='css'>
						<Box mt={2} />
					</Hidden>
					<SearchBox />
				</Grid>

				<Grid item xs={12} md={4} lg={3}>
					<Hidden implementation='css'>
						<Box mt={2} />
					</Hidden>
					<SelectBox mr={0} value={values.categoria} options={options} onChange={handleCategoriaChange('categoria')} />

				</Grid>
			</Grid>

			<Box mt={4}>

				<Grid container spacing={4} justifyContent='space-between'>
					<Content />
				</Grid>

			</Box>
			<Box mt={4} />
		</Container>

	)
}


function Content() {

	const [eventos, setEventos] = React.useState([
		{ id: 12, nome: 'Unção', tipo: 'Culto', local: 'Tchihoco, Rua Direita do Estádio da Tundavala', dataDeTermino: null, dataDeInicio: '2021-02-23 07:00:00', capaUrl: "/igreja/evento1.jpg" },
		{ id: 13, nome: 'Buscando pelo avivamento', tipo: 'Jejum e oração', local: 'Tchihoco, Rua Direita do Estádio da Tundavala', dataDeTermino: '2021-06-16 16:00:00', dataDeInicio: '2021-06-14 00:00:00', capaUrl: "/igreja/evento7.jpg" },
		{ id: 14, nome: 'Mulheres com Propósito', tipo: 'Conferência', local:'Tchihoco, Rua Direita do Estádio da Tundavala',  dataDeTermino: '2021-07-10 08:00:00', dataDeInicio: '2021-07-10 08:00:00', capaUrl: "/igreja/evento3.jpg" },
		{ id: 15, nome: 'Domingo Profético', tipo: 'Culto', local: 'Tchihoco, Rua Direita do Estádio da Tundavala', dataDeTermino: '2021-07-25 07:00:00', dataDeInicio: '2021-07-25 07:00:00', capaUrl: "/igreja/evento4.jpg" },
	]);

	if (!eventos && !eventos.length) {
		return (<Box fontSize='h6.fontSize' >Sem eventos de momento</Box>);
	}

	return eventos.map((evento, key) => (
		<Grid key={key} item xs={12} sm={6} md={4} lg={4}>
			<EventoItem actividade={evento} />
		</Grid>
	))

}