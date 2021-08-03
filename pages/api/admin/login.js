import nc from 'next-connect';
import { generateAuthToken } from '../../../src/helpers/auth';

import onError from '../../../src/helpers/handleOnErrorApi';


const hanlder = nc(onError)
    .post((req, res, next) => {
        const { user, pass } = req.body;

        if (user === 'admin' && pass === '12345')
            res.status(200).json({ tokenAccess: generateAuthToken({ id: process.env.ADMIN_ID }) })
        else
            res.status(404).json({
                error: {
                    code: 44,
                    message: 'Credencias inválidas.'
                }
            })


    })

export default hanlder;