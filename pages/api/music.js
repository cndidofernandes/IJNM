import mysqlDB from '../../src/services/mysqldb';

import registerPubRequestDB from '../../src/helpers/handlePubRequest';
import { NotFound } from '../../src/helpers/errors';

import bodyParser from 'body-parser';

export const config = {
    api: {
        bodyParser: false,
    },
}

const handler =
    registerPubRequestDB(
        mysqlDB, //banco sql
        'musica', //table
        ['titulo', 'linkDaMusica'], //fields required
        'Música publicada com sucesso no site.', // success message
        "Ocorreu um erro desconhecido ao publicar essa música no site." //error message
    ).get(bodyParser.json(), async (req, res) => {

        if(!req.query.page) req.query.page = 1;
        if(!req.query.pageSize) req.query.pageSize = 3;

        const offset = (req.query.page-1) * req.query.pageSize;

        try{
            const [rows ] = await mysqlDB.promise().query(`SELECT * FROM musica ORDER BY id DESC LIMIT ${offset},${req.query.pageSize}`);

            if (!rows.length) throw new NotFound('Ainda não temos músicas para poderes ouvir.', 44);

            res.status(200).json({
                success: {
                    data: rows
                }
            })

        }catch(error){
            next(error);
        }

    });

export default handler;