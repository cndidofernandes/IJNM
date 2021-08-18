import mysqlDB from '../../src/services/mysqldb';
import registerPubRequestDB from '../../src/helpers/handlePubRequest';

import { NotFound } from '../../src/helpers/errors';

import dateToString from "../../src/helpers/dateToString";

import bodyParser from 'body-parser';

export const config = {
    api: {
        bodyParser: false,
    },
}

export default registerPubRequestDB(
    mysqlDB,
    'evento',
    ['nome', 'descricao', 'tipo', 'local', 'data', 'horaDeInicio', 'horaDeTermino', 'slug'],
    'Evento publicado com sucesso no site.',
    "Ocorreu um erro desconhecido ao publicar esse evento no site.",
    'nome'
).get(bodyParser.json(), async (req, res, next) => {

    if(!req.query.offsetDate) req.query.offsetDate = dateToString('Y-M-d h:i:00');
    if(!req.query.pageSize) req.query.pageSize = 3;

    const pageSize = mysqlDB.escape(Number(req.query.pageSize))

    let SQL = `SELECT * FROM evento WHERE criadoEM < '${req.query.offsetDate}' AND dataDeInicio >= '${dateToString('Y-M-d h:i:00')}' ORDER BY id DESC LIMIT ${pageSize}`;

    if(req.query.name) SQL = `SELECT * FROM evento WHERE nome LIKE '${req.query.name}%' AND dataDeInicio >= '${dateToString('Y-M-d h:i:00')}' LIMIT 0,${pageSize}`;

    try{
        const rows = await mysqlDB.query(SQL);

        if (!rows.length) throw new NotFound('Ainda não temos eventos para veres.', 44);

        res.status(200).json({
            success: {
                data: rows
            }
        })

    }catch(error){
        next(error);
    }

});;