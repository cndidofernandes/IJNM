import nc from 'next-connect';

import { imageUpload } from "./multerHelper";
import onError from './handleOnErrorApi';
import { BadRequest, GeneralError } from "./errors";
import { checkAuthToken, checkAdminAuthorization } from './auth'
import slugify from 'slugify';

export default function registerPubRequestDB(mysqlDB, table, requiredFieldsName, okMsg, errMsg, imageFieldName = 'capa', isAuthRequired = true, slugFieldName) {
    const nextMiddleware = (req, res, next) => { next() }

    return nc({ onError })
        .post(isAuthRequired ? checkAuthToken : nextMiddleware, isAuthRequired ? checkAdminAuthorization : nextMiddleware, (req, res, next) => {

            imageUpload(`/${table}`).single(imageFieldName)(req, res, async (error) => {

                try {

                    if (error) return next(error);

                    let reqBody = [];

                    for (let i = 0; i < requiredFieldsName.length; i++) {

                        if (!req.body || !req.body[requiredFieldsName[i]]) throw new BadRequest(`Os campos ${requiredFieldsName} são obrigatorios`, 45);

                        if (requiredFieldsName[i] === 'slug') {
                            reqBody['slug'] = slugify(req.body[requiredFieldsName[i]], { lower: true })
                            
                            continue;
                        }

                        reqBody[requiredFieldsName[i]] = req.body[requiredFieldsName[i]]
                    }

                    const data = { ...reqBody, [`${imageFieldName}Url`]: `${table}/${req.file.filename}` };

                    const rawResult = await mysqlDB.query(`INSERT INTO ${table} SET ?`, data);

                    if (!rawResult.affectedRows) throw new GeneralError(errMsg, 50);

                    await mysqlDB.end();

                    res.status(201).json({ success: { message: okMsg, data: null } })

                } catch (err) {
                    console.log(err);
                    //deleteFile(req?.file?.path);
                    next(err);
                }

            })

        })
}