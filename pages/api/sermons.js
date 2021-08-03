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
    'pregacao',
    ['tema', 'pregador', 'breveDescricao', 'linkDoVideo', 'data'],
    'Pregação publicada com sucesso no site.',
    "Ocorreu um erro desconhecido ao publicar essa pregação no site."
).get(bodyParser.json(), async (req, res) => {

    if(!req.query.page) req.query.page = 1;
    if(!req.query.pageSize) req.query.pageSize = 3;

    const offset = (req.query.page-1) * req.query.pageSize;

    try{
        const [rows ] = await mysqlDB.promise().query(`SELECT * FROM pregacao ORDER BY id DESC LIMIT ${offset},${req.query.pageSize}`);

        if (!rows.length) throw new NotFound('Ainda não temos pregações para poderes assistir.', 44);

        res.status(200).json({
            success: {
                data: rows
            }
        })

    }catch(error){
        next(error);
    }

});;