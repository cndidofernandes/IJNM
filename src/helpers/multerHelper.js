import multer from "multer"
import sftpStorage from 'multer-sftp'

import {BadRequest} from './errors'

var storage = sftpStorage({
    sftp: {
        host: process.env.FTP_HOST,
        port: process.env.FTP_PORT || 22,
        username: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD
    },
    destination: function (req, file, cb) {
        //process.env.image_upload_path
        cb(null, '/home/jesustsd/tmp/upload_api/imagens')
    },
    filename: function (req, file, cb) {
        cb(null, '' + Date.now() + file.originalname.slice(-4))
    },
})

export const imageUpload = multer({
    storage,
    fileFilter: function (req, file, cb) {

        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            return cb(null, true);

        cb(new BadRequest('Esse tipo de ficheiro não é permitido.', 62));

    },
    limits: {
        fileSize: 2000000
    }
})

/*export const imageUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/imagens')
        },
        filename: function (req, file, cb) {
            cb(null, ''+Date.now()+file.originalname.slice(-4))
        }
    }),
    fileFilter: function (req, file, cb) {

        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            return cb(null, true);

        cb(new GeneralError('Esse tipo de ficheiro não é permitido.', 62));

    },
    limits: {
        fileSize: 1850000
    }
})*/

export function deleteFile(path) {

    if (!path) return;

    var fs = require('fs');

    fs.unlink(path, function (err) {
        console.log(err);
    });
}