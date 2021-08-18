export class GeneralError extends Error {
    constructor(message, internalCode) {
        super();
        this.message = message;
        this.internalCode = internalCode;
    }

    getStatusCode() {
        if (this instanceof BadRequest) return 400;

        if (this instanceof Unauthenticated) return 401;

        if (this instanceof Unauthorized) return 403;

        if (this instanceof NotFound) return 404;
    
        return 500;
    }
}

export class BadRequest extends GeneralError { }
export class NotFound extends GeneralError { }
export class Unauthorized extends GeneralError { }
export class Unauthenticated extends GeneralError { }

function getMessageErrorByStatus(errorMessages, status) {
    return {
        '400': "Ocorreu um erro ao processar os dados no servidor.",
        '401': "Ophs! Você não tem autenticação para realizar essa operação.",
        '403': "Ophs! Você não tem autorizacação para realizar essa operação.",
        '404': "Recurso não encontrado.",
        '500': "Ocorreu um erro desconhecido no servidor. Por favor tente novamente.",
        'ERR_NO_CONNECTION': "Sem conexão com o servidor, verifique a sua internet.",
        'ERR_UNKNOWN': "Ocorreu um erro desconhecido. Por favor tente novamente.",
        ...errorMessages
    }[`${status}`]
}

export function getErrorBackend(error, errorsCustom) {
    const err = {};

    if (error.response) {

        err.message = getMessageErrorByStatus(
            errorsCustom,
            error.response.status
        );

        err.status = error.response.status;


    } else if (error.request) {
        err.message = getMessageErrorByStatus({}, 'ERR_NO_CONNECTION')
    } else {
        err.message = getMessageErrorByStatus({}, 'ERR_UNKNOWN')
    }

    return err;
}