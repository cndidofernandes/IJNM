import mysqlDB from '../../src/services/mysqldb';
import registerPubRequestDB from '../../src/helpers/handlePubRequest';

import bodyParser from 'body-parser';

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

    if(!req.query.page) req.query.page = 1;
    if(!req.query.pageSize) req.query.pageSize = 3;

    const offset = (req.query.page-1) * req.query.pageSize;

    try{
        const rows = await mysqlDB.query(`SELECT * FROM doacao ORDER BY id DESC LIMIT ${offset},${req.query.pageSize}`);

        if (!rows.length) throw new NotFound('Ainda não tem nenhuma doação feita.', 44);

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