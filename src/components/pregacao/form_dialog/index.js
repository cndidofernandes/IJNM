import { Box, Dialog } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import api from '../../../services/api';

import Input from './input';
import ImagePickerAndShow from '../../shared/ImagePickerAndShow';
import ResponseTip from '../../shared/ResponseTip';
import Toolbar from './toolbar';

import { useForm } from 'react-hook-form';
import FormData, { promises } from 'form-data';
import { useState, useRef } from 'react';

import { getErrorBackend } from '../../../helpers/errors';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import HttpIcon from '@material-ui/icons/Http';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tema: {
        fontWeight: 'Regular',
        fontSize: theme.typography.h6.fontSize,
        width: '100%',
        margin: 0,
    },
    pregador: {
        fontWeight: 'Bold',
        fontSize: theme.typography.body2.fontSize,
        width: 'auto',
        flexGrow: 1,
        margin: 0,

    },
    data: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.body1.fontSize,
        //maxWidth:142,
        width: 'auto',
        margin: 0,

    },
    linkDoVideo: {
        marginTop: 8 * 1,
        width: '100%',

    },

}));


function FormDialog({ open, onSucess, onClose, title, apiUrl, fields = [] }) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const classes = useStyles();

    const formRef = useRef(null);
    const [hiddenImagePreview, setHiddenImagePreview] = useState(false);


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
            const itemCreated = {}

            for (const field in fields) {
                formData.append(field, data[field])
                itemCreated[`${field}`] = data[field]
            }

            formData.append('capa', data.capa[0]);
            formData.append('slug', data['tema']);
            itemCreated[`slug`] = data['tema']

            await api.post(apiUrl, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (onSucess) onSucess(itemCreated);

            setBackend({
                data: {
                    message: 'A pregação foi publicada com sucesso. Poderá levar alguns minutos para as pessoas verem no site. Obrigado.'
                },
                error: null,
                loading: false
            })

            formRef.current.reset();

            setTimeout(() => {
                setBackend({
                    loading: false,
                    data: null,
                    error: null
                })
            }, 10000);

        } catch (error) {

            setBackend({
                data: null,
                error: getErrorBackend(error, {
                    '400': "Ocorreu um erro ao publicar a pregação no site.",
                    '500': "Algo de estranho aconteceu ao publicar a pregação no site. Por favor, tente novamente.",
                }),
                loading: false
            })

        }

    };

    return (
        <Dialog fullScreen={fullScreen}
            fullWidth={true}
            maxWidth={'sm'} open={open} onClose={backend.loading ? () => { } : onClose}>
            <form ref={formRef} onSubmit={handleSubmit(myHandleSubmit)} onReset={() => setHiddenImagePreview(true)}>
                <Toolbar title={title} onClose={backend.loading ? () => { } : onClose} isSubmitting={backend.loading} />

                <Container>
                    <Grid container justifyContent='center'>
                        <Grid item xs={12} sm={8} md={6} lg={8}>

                            {
                                fields.linkDoVideo && (
                                    <TextField variant='outlined'
                                        className={classes[fields.linkDoVideo.name]}
                                        multiline minRows={1}
                                        disabled={backend.loading}
                                        type={fields.linkDoVideo.type}
                                        label={fields.linkDoVideo.label}
                                        placeholder={fields.linkDoVideo.placeholder}
                                        required
                                        InputProps={{
                                            ...register(fields.linkDoVideo.name),
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <HttpIcon />
                                                </InputAdornment>)
                                        }} />
                                )
                            }


                            <Box width={'100%'} mt={2} minHeight={220} bgcolor='#f3f3f3' borderRadius={8} position='relative'>
                                <ImagePickerAndShow label='Inserir a capa da pregação' inputProps={{ ...register('capa') }} hidden={hiddenImagePreview} iconButtonProps={{
                                    style: { position: 'absolute', top: 0, right: 0 }
                                }} />
                            </Box>
                            <div style={{ marginTop: 8 }}>



                                {
                                    fields && (
                                        <>
                                            {
                                                fields.tema && (
                                                    <Input className={classes[fields.tema.name]}
                                                        multiline
                                                        disabled={backend.loading}
                                                        type={fields.tema.type}
                                                        label={fields.tema.label}
                                                        placeholder={fields.tema.placeholder}
                                                        required inputProps={{ ...register(fields.tema.name) }} />)
                                            }

                                            {
                                                (fields.pregador && fields.data) && (
                                                    <Box display='flex' alignItems={'center'} justifyContent='space-between'>

                                                        <Input className={classes[fields.pregador.name]}
                                                            disabled={backend.loading}
                                                            type={fields.pregador.type}
                                                            label={fields.pregador.label}
                                                            placeholder={fields.pregador.placeholder}
                                                            required inputProps={{ ...register(fields.pregador.name) }} />

                                                        <Box fontSize={'caption.fontSize'} style={{ marginBottom: 12 }} mx={1} color='text.secondary'>
                                                            •
                                                        </Box>

                                                        <Input className={classes[fields.data.name]}
                                                            disabled={backend.loading}
                                                            type={fields.data.type}
                                                            label={fields.data.label}
                                                            placeholder={fields.data.placeholder}
                                                            required inputProps={{ ...register(fields.data.name) }} />

                                                    </Box>
                                                )
                                            }
                                            {
                                                fields.breveDescricao && (
                                                    <Input className={classes[fields.breveDescricao.name]}
                                                        multiline
                                                        disabled={backend.loading}
                                                        type={fields.breveDescricao.type}
                                                        label={fields.breveDescricao.label}
                                                        placeholder={fields.breveDescricao.placeholder}
                                                        required inputProps={{ ...register(fields.breveDescricao.name) }} />
                                                )
                                            }


                                        </>
                                    )

                                }
                            </div>


                            <Box minHeight={64}>
                                <ResponseTip backend={backend} />
                            </Box>
                            <Box py={2} textAlign={'right'}>
                                <Button variant='contained' disableElevation disabled={backend.loading} type='submit' color='primary'>Publicar</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Dialog>
    )
}

export default FormDialog;


