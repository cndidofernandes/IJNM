import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import api from '../../../services/api';

import Input from './input';
import ImagePickerAndShow from '../../shared/ImagePickerAndShow';
import ResponseTip from '../../shared/ResponseTip';
import Toolbar from './toolbar';

import { useForm } from 'react-hook-form';
import FormData from 'form-data';
import { useState, useRef } from 'react';

import { getErrorBackend } from '../../../helpers/errors';
import { makeStyles } from '@material-ui/core/styles';
import PlaceRoundedIcon from '@material-ui/icons/PlaceRounded';
import ScheduleIcon from '@material-ui/icons/Schedule';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    nome: {
        fontWeight: 500,
        fontSize: theme.typography.h6.fontSize,
        width: '100%',
        maxWidth: 500,
        flexGrow: 1,
        margin: 0,
    },
    tipo: {
        fontWeight: 500,
        fontSize: theme.typography.h6.fontSize,
        width: 96,
        margin: 0,
    },
    local: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.body2.fontSize,
        width: 'auto',
        margin: 0,

    },
    data: {
        border: '1px solid #eceff1',
        borderRadius: 6,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: theme.palette.text.secondary,
        fontSize: theme.typography.body1.fontSize,
        width: '100%',
        flexGrow: 1,
        margin: 0,

    },
    linkDoVideo: {
        marginTop: 8 * 1,
        width: '100%',

    },

}));

function FormDialog({ open, onClose, title, apiUrl, fields = [] }) {

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

            for (const field in fields) {
                formData.append(field, data[field])
            }

            formData.append('capa', data.capa[0]);
            formData.append('slug', data['nome']);

            await api.post(apiUrl, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            setBackend({
                data: {
                    message: 'O Evento foi publicado com sucesso. Aguarde cerca de 15 minutos para poder ver o evento no site.'
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
                    '400': "Ocorreu um erro ao publicar o evento no site.",
                    '500': "Algo de estranho aconteceu ao publicar o evento no site. Por favor, tente novamente.",
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

                            <Box width={'100%'} mt={2} minHeight={220} bgcolor='#f3f3f3' borderRadius={8} position='relative'>
                                <ImagePickerAndShow label='Inserir capa do evento' inputProps={{ ...register('capa') }} hidden={hiddenImagePreview} iconButtonProps={{
                                    style: { position: 'absolute', top: 0, right: 0 }
                                }} />
                            </Box>

                            <div style={{ marginTop: 8 }}>
                                {
                                    (fields.tipo && fields.nome) && (
                                        <Box display='flex' alignItems={'center'} mt={2}>

                                            <Input className={classes.tipo}
                                                disabled={backend.loading}
                                                type={fields.tipo.type}
                                                label={fields.tipo.label}
                                                placeholder={fields.tipo.placeholder}
                                                required inputProps={{ ...register(fields.tipo.name) }} />

                                            <Box fontSize={'h4.fontSize'} style={{ marginBottom: 24 }} ml={1} mr={2}>
                                                :
                                            </Box>

                                            <Input className={classes.nome}
                                                fullWidth style={{ width: '100%', flexGrow: 1, maxWidth: '100%' }}
                                                disabled={backend.loading}
                                                type={fields.nome.type}
                                                label={fields.nome.label}
                                                placeholder={fields.nome.placeholder}
                                                required inputProps={{ ...register(fields.nome.name) }} />

                                        </Box>
                                    )
                                }



                                {
                                    fields && (
                                        <>
                                            {
                                                fields.local && (
                                                    <Box pt={2} alignItems='center' display='flex' mb={2}>
                                                        <Box color='error.dark' mr={2} style={{ marginBottom: 12 }}>
                                                            <PlaceRoundedIcon color='inherit' />
                                                        </Box>
                                                        <Input className={classes[fields.local.name]}
                                                            multiline
                                                            disabled={backend.loading}
                                                            type={fields.local.type}
                                                            label={fields.local.label}
                                                            placeholder={fields.local.placeholder}
                                                            required inputProps={{ ...register(fields.local.name) }} />
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
                                            {
                                                (fields.dataDeInicio) && (
                                                    <Box display='flex' alignItems={'center'}>
                                                        <Box color='text.secondary' mr={2} style={{ marginBottom: 12 }}>
                                                            <ScheduleIcon color='inherit' />
                                                        </Box>
                                                        <Box color='text.secondary' fontSize={'body2.fontSize'} style={{ marginBottom: 16 }} mr={2}>
                                                            De
                                                        </Box>
                                                        <Input className={classes.data}
                                                            disabled={backend.loading}
                                                            type={fields.dataDeInicio.type}
                                                            label={fields.dataDeInicio.label}
                                                            placeholder={fields.dataDeInicio.placeholder}
                                                            required inputProps={{ ...register(fields.dataDeInicio.name) }} />

                                                    </Box>
                                                )
                                            }
                                            {
                                                (fields.dataDeTermino) && (
                                                    <Box display='flex' alignItems={'center'}>
                                                        <Box color='text.secondary' mr={2} style={{ marginBottom: 12 }}>
                                                            <ScheduleIcon color='inherit' />
                                                        </Box>

                                                        <Box color='text.secondary' fontSize={'body2.fontSize'} style={{ marginBottom: 16 }} mr={2}>
                                                            Ate
                                                        </Box>

                                                        <Input className={classes.data}
                                                            disabled={backend.loading}
                                                            type={fields.dataDeTermino.type}
                                                            label={fields.dataDeTermino.label}
                                                            placeholder={fields.dataDeTermino.placeholder}
                                                            required
                                                            inputProps={{ ...register(fields.dataDeTermino.name) }} />

                                                    </Box>
                                                )
                                            }

                                            {
                                                fields.descricao && (
                                                    <Input className={classes[fields.descricao.name]}
                                                        multiline
                                                        disabled={backend.loading}
                                                        type={fields.descricao.type}
                                                        label={fields.descricao.label}
                                                        placeholder={fields.descricao.placeholder}
                                                        required inputProps={{ ...register(fields.descricao.name) }} />
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


