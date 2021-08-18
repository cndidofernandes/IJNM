/*import mysql2 from 'mysql2'

export default mysql2.createPool({
    host: process.env.DATABASE_MYSQL_HOST,
    user: process.env.DATABASE_MYSQL_USER,
    password: process.env.DATABASE_MYSQL_PASSWORD,
    database: process.env.DATABASE_MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,

    typeCast: function (field, next) {

        if (field.type === 'DATETIME' || field.type === 'DATE' ) {
            return field.string();
        }

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

});;*/

import mysql from 'serverless-mysql';

export default mysql({
    config: {
        host: process.env.DATABASE_MYSQL_HOST,
        user: process.env.DATABASE_MYSQL_USER,
        password: process.env.DATABASE_MYSQL_PASSWORD,
        database: process.env.DATABASE_MYSQL_DATABASE,
        typeCast: function (field, next) {

            if (field.type === 'DATETIME' || field.type === 'DATE') {
                return field.string();
            }

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
    },
    cap: 200,
    onConnect: () => {
        console.log('connected');
    },
    onConnectError: (e) => { console.log('Connect Error: ' + e.code) }
})


