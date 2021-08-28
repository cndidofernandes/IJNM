import mysqlDB from '../../src/services/mysqldb';
import registerPubRequestDB from '../../src/helpers/handlePubRequest';

import bodyParser from 'body-parser';
import { NotFound } from '../../src/helpers/errors';

import dateToString from "../../src/helpers/dateToString";

export const config = {
    api: {
        bodyParser: false,
    },
}

export default registerPubRequestDB(
    mysqlDB,
    'doacao',
    ['primeiro_nome', 'ultimo_nome', 'email', 'valor', 'morada', 'mensagem'],
    'Doação feita com sucesso.',
    "Ocorreu um erro desconhecido ao fazer a doação.",
    'comprovativo',
    false
).get(bodyParser.json(), async (req, res, next) => {

    if (!req.query.dateQueryFrom) req.query.dateQueryFrom = dateToString('Y-M-01 00:00:00');
    if (!req.query.dateQueryUntil) req.query.dateQueryUntil = dateToString('Y-M-30 23:59:59');;
    if (!req.query.pageSize) req.query.pageSize = 3;

    const pageSize = mysqlDB.escape(Number(req.query.pageSize))

    let SQL;
    let FETCH_DOACAO_RESUME_SQL;

    SQL = `SELECT * FROM doacao WHERE criadoEM >= '${req.query.dateQueryFrom}' AND criadoEM ${req.query.offsetDate ? '<' : '<='} '${req.query.offsetDate || req.query.dateQueryUntil}' ORDER BY id DESC LIMIT ${pageSize}`;
    FETCH_DOACAO_RESUME_SQL = `SELECT COUNT(doacao.id) as n_doacoes, SUM(doacao.valor) as total_arrecadado FROM doacao WHERE criadoEM >= '${req.query.dateQueryFrom}' AND criadoEM <= '${req.query.dateQueryUntil}'`;


    try {
        const rows = await mysqlDB.query(SQL);

        let rowDoacoesResume = {};

        if (!req.query.offsetDate)
            rowDoacoesResume = await mysqlDB.query(FETCH_DOACAO_RESUME_SQL);

        if (!rows.length) throw new NotFound('Ainda não foram feitas nenhuma doação.', 44);

        res.status(200).json({
            success: {
                data: rows,
                doacoesResume: rowDoacoesResume[0]
            }
        })

    } catch (error) {
        next(error);
    }

})