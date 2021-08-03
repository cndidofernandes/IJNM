import { Box, Dialog } from '@material-ui/core'

import api from '../../services/api';

import Input from './input'
import Toolbar from './toolbar'

import { useForm } from 'react-hook-form';
import FormData from 'form-data';
import { useState, useRef } from 'react';

import { getError } from '../../helpers/errors';

import ResponseTip from '../shared/ResponseTip';

function FormDialog({ open, onClose, title, apiUrl, fields = [] }) {
    const formRef = useRef(null);

    const [backend, setBackend] = useState({
        loading: false,
        data: null,
        error: null
    });

    const { register, handleSubmit } = useForm();

    const myHandleSubmit = async (data) => {

        setBackend({
            data: null,
            error: null,
            loading: true
        })

        try {

            const formData = new FormData();

            for (const field of fields) formData.append(field['name'], data[field['name']])

            formData.append('capa', data.capa[0]);

            await api.post(apiUrl, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            setBackend({
                data: {
                    message: 'A música foi publicada com sucesso.'
                },
                error: null,
                loading: false
            })

            formRef.current.reset();

        } catch (error) {

            setBackend({
                data: null,
                error: getError(error, {
                    '400': "Ocorreu um erro ao publicar a música no site.",
                    '500': "Algo de estranho aconteceu ao publicar a música no site. Por favor, tente novamente.",
                }),
                loading: false
            })

        }

    };

    return (
        <Dialog fullScreen open={open} onClose={backend.loading ? () => { } : onClose}>
            <form ref={formRef} onSubmit={handleSubmit(myHandleSubmit)}>
                <Toolbar title={title} onClose={backend.loading ? () => { } : onClose} isSubmitting={backend.loading} />

                <div style={{ paddingLeft: 22, paddingRight: 24, marginTop: 8 }}>
                    {fields?.map
                        (
                            (inputProps, i) =>
                                <Input
                                    key={i}
                                    disabled={backend.loading}
                                    type={inputProps.type}
                                    label={inputProps.label}
                                    placeholder={inputProps.placeholder}
                                    required
                                    {...register(inputProps.name)} />
                        )
                    }
                </div>

                <div style={{ paddingLeft: 18, paddingRight: 16, marginTop: 24 }}>
                    <input required disabled={backend.loading} {...register('capa')} type='file' accept="image/png, image/jpeg" />
                </div>
                <Box minHeight={64}>
                    <ResponseTip backend={backend} />
                </Box>
            </form>
        </Dialog>
    )
}

export default FormDialog;