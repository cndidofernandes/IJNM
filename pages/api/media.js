import nc from 'next-connect';
import mysqlDB from '../../src/services/mysqldb';
import handlePubRequest from '../../src/helpers/handlePubRequest';

import onError from '../../src/helpers/handleOnErrorApi';

import dateToString from "../../src/helpers/dateToString";

import { NotFound } from "../../src/helpers/errors";
import deleteFiles from "../../src/helpers/deleteFiles";
import { checkAuthToken, checkAdminAuthorization } from '../../src/helpers/auth'

export const config = {
    api: {
        bodyParser: false,
    },
}

const hanlder = handlePubRequest(
    mysqlDB, //banco sql
    'fotos_evento', //table
    ['idEvento', 'descricao'], //fields required
    'Foto adicionada com sucesso.', // success message
    "Ocorreu um erro desconhecido ao adicionar esta foto no site.",//error message
    "foto" //imageFieldName message
).get(async (req, res, next) => {

    if (!req.query.offsetDate) req.query.offsetDate = dateToString('Y-M-d h:i:00');
    if (!req.query.pageSize) req.query.pageSize = 3;

    const pageSize = mysqlDB.escape(Number(req.query.pageSize))

    let SQL = `SELECT DISTINCT evento.* FROM fotos_evento INNER JOIN evento ON fotos_evento.idEvento = evento.id WHERE criadoEM < '${req.query.offsetDate}' ORDER BY id DESC LIMIT ${pageSize}`;

    if (req.query.name) SQL = `SELECT DISTINCT evento.* FROM fotos_evento INNER JOIN evento ON fotos_evento.idEvento = evento.id WHERE nome LIKE '${req.query.name}%' LIMIT 0,${pageSize}`;

    try {
        const rows = await mysqlDB.query(SQL);

        if (!rows.length) throw new NotFound('Ainda não temos eventos com media para veres.', 44);

        await mysqlDB.end();

        res.status(200).json({
            success: {
                data: rows
            }
        })

    } catch (error) {
        next(error);
    }



}).delete(async (req, res, next) => {
    const id = req.query.id;

    //Apagar foto
    await deleteFiles({
        files: [req.query.capaUrl],
        callback: async () => {
            //Apagar registo
            const SQL = `DELETE FROM fotos_evento WHERE id=?`;
            try {
                const rows = await mysqlDB.query(SQL, [id]);

                if (!rows.affectedRows) throw new NotFound('Foto não encontrada. Já deve ter sido apagada', 44);

                res.status(201).json({ success: { message: 'Foto apagada com sucesso.', data: null } })

            } catch (error) {
                next(error);
            }
        }

    });
});

export default hanlder;