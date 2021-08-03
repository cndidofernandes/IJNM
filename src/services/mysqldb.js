import mysql2 from 'mysql2'

export default mysql2.createConnection({
    host: process.env.DATABASE_MYSQL_HOST,
    user: process.env.DATABASE_MYSQL_USER,
    password: process.env.DATABASE_MYSQL_PASSWORD,
    database: process.env.DATABASE_MYSQL_DATABASE,
    multipleStatements: true,

    typeCast: function (field, next) {

        /*if (field.type === 'DATETIME') {
            return moment(field.string()).format('YYYY-MM-DD HH:mm:ss');
        }*/

        if (field.type === 'TINY' && field.length === 1) {

            switch (field.string()) {

                case '1': return true;
                    break;
                case '0': return false;
                    break;
                default: return null;
                    break;
            }
        }

        return next();
    }

});;
