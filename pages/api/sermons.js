import mysqlDB from '../../src/services/mysqldb';
import registerPubRequestDB from '../../src/helpers/handlePubRequest';
import { NotFound } from '../../src/helpers/errors';

import bodyParser from 'body-parser';
import dateToString from '../../src/helpers/dateToString';

export const config = {
    api: {
        bodyParser: false,
    },
}

export default registerPubRequestDB(
    mysqlDB,
    'pregacao',
    ['tema', 'pregador', 'breveDescricao', 'linkDoVideo', 'data', 'slug'],
    'Pregação publicada com sucesso no site.',
    "Ocorreu um erro desconhecido ao publicar essa pregação no site.",
    'tema'
).get(bodyParser.json(), async (req, res, next) => {

    if(!req.query.offsetDate) req.query.offsetDate = dateToString('Y-M-d h:i:00');
    if(!req.query.pageSize) req.query.pageSize = 3;


    const pageSize = mysqlDB.escape(Number(req.query.pageSize))

    let SQL = `SELECT * FROM pregacao WHERE criadoEM < '${req.query.offsetDate}' ORDER BY id DESC LIMIT ${pageSize}`;

    if(req.query.topic) SQL = `SELECT * FROM pregacao WHERE tema LIKE '${req.query.topic}%' LIMIT 0,${pageSize}`;

    try{
        const rows = await mysqlDB.query(SQL);

        if (!rows.length) throw new NotFound('Ainda não temos pregações para poderes assistir.', 44);

        await mysqlDB.end();

        res.status(200).json({
            success: {
                data: rows
            }
        })

    }catch(error){
        next(error);
    }

});;