import mysqlDB from '../../src/services/mysqldb';
import registerPubRequestDB from '../../src/helpers/handlePubRequest';

import { NotFound } from '../../src/helpers/errors';

import dateToString from "../../src/helpers/dateToString";

import bodyParser from 'body-parser';

import { checkAuthToken, checkAdminAuthorization } from '../../src/helpers/auth'
import deleteFiles from "../../src/helpers/deleteFiles";

export const config = {
    api: {
        bodyParser: false,
    },
}

export default registerPubRequestDB(
    mysqlDB,
    'evento',
    ['nome', 'descricao', 'tipo', 'local', 'dataDeInicio', 'dataDeTermino', 'slug'],
    'Evento publicado com sucesso no site.',
    "Ocorreu um erro desconhecido ao publicar esse evento no site.",
    'capa',
    false,
    'nome'
).get(bodyParser.json(), async (req, res, next) => {

    if(!req.query.offsetDate) req.query.offsetDate = dateToString('Y-M-d h:i:00');
    if(!req.query.pageSize) req.query.pageSize = 3;

    const pageSize = mysqlDB.escape(Number(req.query.pageSize))

    let SQL = `SELECT * FROM evento WHERE criadoEm < '${req.query.offsetDate}' AND dataDeInicio >= '${dateToString('Y-M-d h:i:00')}' ORDER BY id DESC LIMIT ${pageSize}`;

    if(req.query.name) SQL = `SELECT * FROM evento WHERE nome LIKE '${req.query.name}%' AND dataDeInicio >= '${dateToString('Y-M-d h:i:00')}' LIMIT 0,${pageSize}`;

    try{
        const rows = await mysqlDB.query(SQL);

        if (!rows.length) throw new NotFound('Ainda não temos eventos para veres.', 44);

        res.status(200).json({
            success: {
                data: rows
            }
        })

    }catch(error){
        next(error);
    }

})
.delete(bodyParser.json(), async (req, res, next) => {
    const id = req.query.id;
   
    //Pegar as fotos da galeria
    /*try{
        const SQL = `SELECT foto, id FROM fotos_evento WHERE id=?`;

        const rows = await mysqlDB.query(SQL, [id]);
        const fotos = rows.map((item) => item.foto);

        //Apaga as fotos no disco
        await deleteFiles({
            files: [...fotos],
            callback: async ()=>{
                //Apagar registos
                const SQL = `DELETE FROM fotos_evento WHERE idEvento=?`;
                    try{
                        const rows = await mysqlDB.query(SQL, [id]);

                        if (!rows.affectedRows) throw new NotFound('Evento não encontrado. Já deve ter sido apagado', 44);

                         res.status(201).json({ success: { message:  'Evento apagado com sucesso.', data: null } })

                    }catch(error){
                        next(error);
                    }
            }

        });

    }catch(error){
        next(error);
    }*/

    //Apaga os registos na tabela Galeria


    //Apagar Evento
    await deleteFiles({
        files: [req.query.capaUrl],
        callback: async ()=>{
            //Apagar registo
            const SQL = `DELETE FROM evento WHERE id = ?`;
                try{
                    const rows = await mysqlDB.query(SQL, [id]);

                    if (!rows.affectedRows) throw new NotFound('Evento não encontrado. Já deve ter sido apagado', 44);

                     res.status(201).json({ success: { message:  'Evento apagado com sucesso.', data: null } })

                }catch(error){
                    next(error);
                }
        }

    });
})