import mysqlDB from '../../src/services/mysqldb';
import registerPubRequestDB from '../../src/helpers/handlePubRequest';

import { NotFound } from '../../src/helpers/errors';

import bodyParser from 'body-parser';

export const config = {
    api: {
        bodyParser: false,
    },
}

export default registerPubRequestDB(
    mysqlDB,
    'evento',
    ['nome', 'descricao', 'tipo', 'local', 'data', 'horaDeInicio', 'horaDeTermino'],
    'Evento publicado com sucesso no site.',
    "Ocorreu um erro desconhecido ao publicar esse evento no site."
).get(bodyParser.json(), async (req, res) => {

    if(!req.query.page) req.query.page = 1;
    if(!req.query.pageSize) req.query.pageSize = 3;

    const offset = (req.query.page-1) * req.query.pageSize;

    try{
        const [rows ] = await mysqlDB.promise().query(`SELECT * FROM evento ORDER BY id DESC LIMIT ${offset},${req.query.pageSize}`);

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