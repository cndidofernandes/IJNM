import dateToString from './dateToString';

export default function startEndDateToString(dataInicio, dataTermino=null){

	 const dInicio = new Date(dataInicio);

	 if(dataTermino===null){
	 	dataTermino = dataInicio;
	 }
	 const dTermino = new Date(dataTermino);
	 console.log(data_time_to_inline_number(dInicio));

	 if(data_time_to_inline_number(dInicio)>data_time_to_inline_number(dTermino)){

	 	return dateCompare(dTermino, dInicio);
	 }
	return dateCompare(dInicio, dTermino);
}


function dateCompare(inicio, fim){
	let result = 'Dia ';
	//Datas iguais
	if(data_to_inline_number(inicio) !== data_to_inline_number(fim)){
		result = 'De ';
	}
	result += `${inicio.getDay()}`;

	if((inicio.getMonth() === fim.getMonth()) && (inicio.getDay() === fim.getDay())){
		result += ` de `;
	}else if((inicio.getMonth() === fim.getMonth() && inicio.getFullYear() === fim.getFullYear()) && (inicio.getDay() !== fim.getDay())){
		result += ` a `;
		result += `${fim.getDay()} de `;
	}

	if(inicio.getMonth() === fim.getMonth()){
		result += `${dateToString(' m ',inicio)} `; //'de' se usar o ano 
	}

	//Usar o ano
	if(inicio.getFullYear() !== fim.getFullYear()){
		result += ` de ${inicio.getFullYear()}`;
	}

	if((inicio.getMonth() !== fim.getMonth() || inicio.getFullYear() !== fim.getFullYear()) ){
		result += ` a ${dateToString('d $de m $d$e Y',fim)}`;
	}
	result +=" "+ timeCompare(inicio, fim);

	

	return result;

}

function timeCompare(inicio, fim){
	let result='';
	//Horas iguais
	//Horas iguais, trabalha apenas com a hora de inicio
	if(inicio.getHours() !== fim.getHours()){
		result += `d`;
	}
	//Hora de inicio
	result += `as ${String(inicio.getHours())}h`;
	result += String(resolveMinutes(inicio.getMinutes()));

	//horas !==
	if(inicio.getHours() !== fim.getHours()){
		result += ` às `;

		//Hora de fim
		result += `${String(fim.getHours())}h`;
		result += String(resolveMinutes(fim.getMinutes()));
	}

	return result;
}

function resolveMinutes(minutes){
	if(minutes) {
		return minutes; 
	}
	return '';
}
function data_to_inline_number(data){
	return data.getFullYear()*10000 + (data.getMonth()*1000) + data.getDay();
}
function data_time_to_inline_number(data){
	let time = data.getHours()*100 + (data.getMinutes());
	return data.getFullYear()*100000000 + (data.getMonth()*1000000) + data.getDay()*10000+time;
}