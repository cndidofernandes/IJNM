import { Box, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Router from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../src/services/api';
import { AuthContext } from '../src/contexts/AuthContext';
import { getError } from '../src/helpers/errors';

import ResponseTip from '../src/components/shared/ResponseTip';

function Admin() {
    const { authenticateAdmin, isAuthenticated } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    const [backend, setBackend] = useState({
        loading: false,
        data: null,
        error: null
    });

    useEffect(() => {
        if (isAuthenticated) Router.push('/')
    }, [0])

    const myHandleSubmitting = async (data) => {

        setBackend({
            loading: true,
            data: null,
            error: null
        })

        try {
            const res = await api.post('/admin/login', data);

            authenticateAdmin(res.data.tokenAccess);

        } catch (error) {

            setBackend({
                data: null,
                error: getError(error, {
                    '404': 'O nome do usúario ou palavra-passe estão incorrentos.'
                }),
                loading: false
            })

        }

    }

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box m={4} fontSize='h3.fontSize' fontWeight='medium'>Acessar com Administrador</Box>
            <form onSubmit={handleSubmit(myHandleSubmitting)} style={{ width: '40%' }}>
                <TextField fullWidth size='small' label='Nome do usuario' placeholder='Usuario' inputProps={{ required: true, ...register('user') }} />
                <br />
                <br />
                <TextField fullWidth size='small' label='Palavra-passe' placeholder='Palavra-passe' inputProps={{ type: 'password', required: true, ...register('pass') }} />
                <br />
                <br />
                <Button fullWidth disabled={backend.loading} type='submit' color='secondary' variant='contained' size='large' style={{paddingTop: 8*2, paddingBottom: 8*2, borderRadius:8, boxShadow: 'none' }}>Entrar</Button>
                <br />
                <br />
                <Box minHeight={64}>
                    <ResponseTip backend={backend} />
                </Box>
                <Box height={16 * 8} />
            </form>
        </Box>
    )
}
export default Admin;