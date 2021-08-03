import jwt from 'jsonwebtoken'
import { Unauthorized } from './errors';


export function generateAuthToken(data) {

    return jwt.sign(data, process.env.SECRET_JWT, {
        expiresIn: '30d',
        audience: 'https://igreja.co.ao',
        issuer: 'https://igreja.herokuapp.com/'
    });

}


export function checkAuthToken(req, res, next) {


    let token = '';

    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');

        if (parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            throw new Unauthorized('Invalid authorization header format. Format is Authorization: Bearer [token]', 43);
        }
    } else {
        throw new Unauthorized('No authorization header was found', 43);
    }

    try {
        
        var decoded = jwt.verify(token, process.env.SECRET_JWT);

        req.admin = {};
        req.admin.id = decoded.id;
    } catch (err) {
        throw new Unauthorized('Invalid token detected.', 43);
    }

    next();
}

export function checkAdminAuthorization(req, res, next) {
    if (req.admin.id === process.env.ADMIN_ID) {
        next();
    } else {

        res.status(403).json({
            error: {
                code: 0,
                message: "Você não tem autorização para realizar essa operação"
            }
        });
    }
}