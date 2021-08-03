import mysqlDB from '../../src/services/mysqldb';
import registerPubRequestDB from '../../src/helpers/handlePubRequest';

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
    'comprovativo'
);