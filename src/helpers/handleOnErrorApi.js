import { GeneralError } from './errors';
import { MulterError } from 'multer'

export default function onError(err, req, res, next) {
    let error = {};

    const setError = (statusCode, code, message) => error = { statusCode, code, message }

    if (err instanceof GeneralError) {
        setError(err.getStatusCode(), err.internalCode, err.message);

    } else if (err instanceof SyntaxError) {
        setError(400, 48, err.message);

    } else if (err.name === 'UnauthorizedError') {
        setError(401, err.code, err.message);

    } else if (err instanceof MulterError) {
        // A Multer error occurred when uploading.
        var errorMessages = {
            LIMIT_PART_COUNT: 'Too many parts',
            LIMIT_FILE_SIZE: 'File too large',
            LIMIT_FILE_COUNT: 'Too many files',
            LIMIT_FIELD_KEY: 'Field name too long',
            LIMIT_FIELD_VALUE: 'Field value too long',
            LIMIT_FIELD_COUNT: 'Too many fields',
            LIMIT_UNEXPECTED_FILE: 'Unexpected field'
        }

        setError(400, 60, errorMessages[err.code]);

    } else {
        setError(500, 50, err.message ? err.message : 'Ocorreu um erro desconhecido no servidor.');
    }

    return res.status(error.statusCode).end(
        JSON.stringify({
            error: {
                code: error.code,
                message: error.message
            }
        }));

}