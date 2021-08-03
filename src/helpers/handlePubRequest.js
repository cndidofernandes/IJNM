import nc from 'next-connect';

import { imageUpload, deleteFile } from "./multerHelper";
import onError from './handleOnErrorApi';
import { BadRequest, GeneralError } from "./errors";
import {checkAuthToken, checkAdminAuthorization} from './auth'

export default function registerPubRequestDB(mysqlDB, table, requiredFieldsName, okMsg, errMsg, imageFieldName = 'capa') {

    return nc({ onError })
        .post(checkAuthToken, checkAdminAuthorization, (req, res, next) => {

            imageUpload.single(imageFieldName)(req, res, async (error) => {

                try {

                    if (error) return next(error);

                    let reqBody = [];

                    for (let i = 0; i < requiredFieldsName.length; i++) {

                        if (!req.body || !req.body[requiredFieldsName[i]]) throw new BadRequest(`Os campos ${requiredFieldsName} são obrigatorios`, 45);

                        reqBody[requiredFieldsName[i]] = req.body[requiredFieldsName[i]]
                    }

                    const data = { ...reqBody, [`${imageFieldName}Url`]: req.file.filename };

                    const rawResult = await mysqlDB.promise().query(`INSERT INTO ${table} SET ?`, data);

                    if (!rawResult[0].affectedRows) throw new GeneralError(errMsg, 50);

                    res.status(201).json({ success: { message: okMsg, data: null } })

                } catch (err) {
                    deleteFile(req?.file?.path);
                    next(err);
                }

            })

        })
}