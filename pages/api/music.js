import mysqlDB from '../../src/services/mysqldb';

import handlePubRequest from '../../src/helpers/handlePubRequest';
import { NotFound } from '../../src/helpers/errors';

import dateToString from "../../src/helpers/dateToString";

import { checkAuthToken, checkAdminAuthorization } from '../../src/helpers/auth'

import deleteFiles from "../../src/helpers/deleteFiles";

import bodyParser from 'body-parser';

export const config = {
    api: {
        bodyParser: false,
    },
}

export default handlePubRequest(
    mysqlDB, //banco sql
    'musica', //table
    ['titulo', 'linkDaMusica'], //fields required
    'Música publicada com sucesso no site.', // success message
    "Ocorreu um erro desconhecido ao publicar essa música no site." //error message
).get(bodyParser.json(), async (req, res, next) => {

    if (!req.query.offsetDate) req.query.offsetDate = dateToString('Y-M-d h:i:00');
    if (!req.query.pageSize) req.query.pageSize = 3;


    const pageSize = mysqlDB.escape(Number(req.query.pageSize))

    let SQL = `SELECT * FROM musica WHERE criadoEM < '${req.query.offsetDate}' ORDER BY id DESC LIMIT ${pageSize}`;

    if (req.query.title) SQL = `SELECT * FROM musica WHERE titulo LIKE '${req.query.title}%' LIMIT 0,${pageSize}`;

    try {
        const rows = await mysqlDB.query(SQL);

        if (!rows.length) throw new NotFound('Ainda não temos músicas para poderes ouvir.', 44);

        await mysqlDB.end();

        res.status(200).json({
            success: {
                data: rows
            }
        })

    } catch (error) {
        next(error);
    }

}).delete(checkAuthToken, checkAdminAuthorization, bodyParser.json(), async (req, res, next) => {
    const id = req.query.id;

    //Apagar foto

    await deleteFiles({
        files: [req.query.capaUrl],
        callback: async () => {
            //Apagar registo
            const SQL = `DELETE FROM musica WHERE id=?`;
            try {
                const rows = await mysqlDB.query(SQL, [id]);

                if (!rows.affectedRows) throw new NotFound('Musica não encontrada. Já deve ter sido apagada ou movida', 44);

                res.status(201).json({ success: { message: 'Música apagada com sucesso.', data: null } })

            } catch (error) {
                next(error);
            }
        }

    })
});