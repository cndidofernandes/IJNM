import mysqlDB from '../../src/services/mysqldb';
import registerPubRequestDB from '../../src/helpers/handlePubRequest';
import { BadRequest, NotFound } from '../../src/helpers/errors';

import bodyParser from 'body-parser';
import dateToString from '../../src/helpers/dateToString';

import deleteFiles from "../../src/helpers/deleteFiles";

import { checkAuthToken, checkAdminAuthorization } from '../../src/helpers/auth'

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
    "Ocorreu um erro desconhecido ao publicar essa pregação no site."
).get(bodyParser.json(), async (req, res, next) => {

    if (!req.query.offsetDate) req.query.offsetDate = dateToString('Y-M-d h:i:00');
    if (!req.query.pageSize) req.query.pageSize = 3;


    const pageSize = mysqlDB.escape(Number(req.query.pageSize))

    let SQL = `SELECT * FROM pregacao WHERE criadoEM < '${req.query.offsetDate}' ORDER BY id DESC LIMIT ${pageSize}`;

    if (req.query.topic) SQL = `SELECT * FROM pregacao WHERE tema LIKE '${req.query.topic}%' LIMIT 0,${pageSize}`;

    try {
        const rows = await mysqlDB.query(SQL);

        if (!rows.length) throw new NotFound('Ainda não temos pregações para poderes assistir.', 44);

        await mysqlDB.end();

        res.status(200).json({
            success: {
                data: rows
            }
        })

    } catch (error) {
        next(error);
    }

}).delete(checkAuthToken, checkAdminAuthorization, async (req, res, next) => {

    if (!req.query.id && !req.query.slug){
        next(new BadRequest('Querys id or slug are required', 40));
        return;
    }

    //Apagar foto
    await deleteFiles({
        files: [req.query.capaUrl],
        callback: async () => {
            //Apagar registo
            const SQL = `DELETE FROM pregacao WHERE ${req.query.id ? 'id' : 'slug'} = ?`;

            try {
                const rows = await mysqlDB.query(SQL, [req.query.id || req.query.slug]);

                if (!rows.affectedRows) throw new NotFound('Pregação não encontrada. Já deve ter sido apagada', 44);

                res.status(200).json({ success: { message: 'Pregação apagada com sucesso.', data: null } })

            } catch (error) {
                next(error);
            }
        }
    })

})