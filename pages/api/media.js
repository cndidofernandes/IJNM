import nc from 'next-connect';
import mysqlDB from '../../src/services/mysqldb';

import onError from '../../src/helpers/handleOnErrorApi';

import dateToString from "../../src/helpers/dateToString";

import {NotFound} from "../../src/helpers/errors";


const hanlder = nc({onError})
    .get(async (req, res, next) => {

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



    })

export default hanlder;