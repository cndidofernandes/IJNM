import React from "react";
import LiderancaRow from "../src/components/lideranca/LiderancaRow";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";


export default function NossaLideranca(props){

	React.useEffect(() => {
		props.setTabSelectedIndex(3);
	}, []);

	return(
		<>
			<Container>
				<Box mt={4} />
				<Box fontSize={'h4.fontSize'} textAlign='left' fontWeight='fontWeightBold' children="Nossa Liderança"/>
				<Box mt={8} />

				<Content/>		
				
			</Container>
		</>
		)
}

function Content({pregacao}){
	const [lideranca, setLideranca]=React.useState([
			{
				funcao: 'Fundadores',
				membros:[
					{id: 12, nome: 'Apostolo Stanley Idehen', funcao: 'Natural de Benin City – Nigéria'},
					{id: 13, nome: 'Apostola Yolanda Natividade Dias', funcao: 'Natural de Luanda – Angola'},
				],
			},
			{
				funcao: 'Áreas',
				membros:[
					{id: 12, nome: 'Diná Elisa Ngatiki Jaime', funcao: 'Secretaria'},
					{id: 13, nome: 'Eduardo Carlos Giovetti Neto', funcao: 'Área Inspecção e Auditoria'},
					{id: 14, nome: 'Manuel Tomás', funcao: 'Área de Apoio Social'},
					{id: 14, nome: 'Hélder Lazary Soares', funcao: 'Área de Relações e Intercâmbios'},
					{id: 14, nome: 'Maria Teresa Jaime', funcao: 'Área de Infância e Juventude'},
					{id: 14, nome: 'Maria Rosa de Lima Kapenda', funcao: 'Área de Finanças'},
					{id: 14, nome: 'Josefina Quibinda Bungo', funcao: 'Área da Tesouraria'},
					
				],
			},			
		]);

	if(!lideranca && !lideranca.length){
		return (<Box fontSize='h6.fontSize' >Sem pregações de momento</Box>);
	}

	return lideranca.map((funcao, key)=>(
			<LiderancaRow key={key} funcao={funcao}/>
		))

}	