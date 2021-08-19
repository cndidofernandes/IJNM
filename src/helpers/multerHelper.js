import multer from "multer"
import { GeneralError } from "./errors";

export const imageUpload = multer({
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
})

export function deleteFile(path) {

    if(!path) return;
    
    var fs = require('fs');

    fs.unlink(path, function (err) {
        console.log(err);
    });
}


//var sftpStorage = require('multer-sftp');
/*var storage = sftpStorage({
  sftp: {
    host: process.env.FTP_HOST,
    port: process.env.FTP_PORT,
    username: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD
  },
  destination: function (req, file, cb) {
    cb(null, './public/imagens')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})*/