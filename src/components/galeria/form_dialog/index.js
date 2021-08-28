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
import FormData, { promises } from 'form-data';
import { useState, useRef } from 'react';

import { getErrorBackend } from '../../../helpers/errors';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import HttpIcon from '@material-ui/icons/Http';
import PlaceRoundedIcon from '@material-ui/icons/PlaceRounded';
import ScheduleIcon from '@material-ui/icons/Schedule';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';

   




const useStyles = makeStyles((theme) => ({
    nome: {
        fontWeight: 500,
        fontSize: theme.typography.h6.fontSize,
        width:'100%',
         maxWidth:500,
        flexGrow:1,
        margin:0,
    },
    tipo: {
        fontWeight: 500,
        fontSize: theme.typography.h6.fontSize,
        width: 96,
        margin:0,
    },
    local: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.body2.fontSize,
        width:'auto',
        margin:0,

    },
    data: {
        border: '1px solid #eceff1',
        borderRadius:6,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: theme.palette.text.secondary,
        fontSize: theme.typography.body1.fontSize,
        width:'100%',
        flexGrow:1,
        margin:0,
        
    },
    linkDoVideo: {
        marginTop: 8*1,
        width:'100%',
        
    },

}));

function FormDialog({idEvento, open, onClose,onSucess, title, apiUrl }) {
    const fields = {
        descricao: { type: 'text', label: 'foto', name: 'descricao', placeholder: 'Escreva a descrição da foto' },
    }

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

            formData.append('foto', data.capa[0]);
            formData.append('idEvento', idEvento);
            formData.append('descricao', data['descricao']);

            await api.post(apiUrl, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            if(onSucess) onSucess();
			setBackend({
				data: {
					message: 'Foto adicionada com sucesso. Aguarde cerca de 15 minutos para poder ver a imagem.'
				},
				error: null,
				loading: false
			})

            formRef.current.reset();

        } catch (error) {

            setBackend({
                data: null,
                error: getErrorBackend(error, {
                    '400': "Ocorreu um erro ao adicionar a foto.",
                    '500': "Algo de estranho aconteceu ao adicionar a foto no site. Por favor, tente novamente.",
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
                                            <ImagePickerAndShow inputProps={{ ...register('capa') }} hidden={hiddenImagePreview} iconButtonProps={{
                                                style:{position: 'absolute', top:0, right: 0, color: '#fff', backgroundColor:'rgba(255,255,255, .1)'}
                                            }}/>
                                        </Box>
                           
                                        <div style={{ marginTop: 8 }}>
                                        
                                        {
                                            fields?.descricao &&(
                                                    <Input className={classes[fields.descricao.name]} 
                                                            multiline 
                                                            disabled={backend.loading} 
                                                            type={fields.descricao.type} 
                                                            label={fields.descricao.label} 
                                                            placeholder={fields.descricao.placeholder} 
                                                            required inputProps={{...register(fields.descricao.name)}} />                                           
                                            )

                                        }
                                    </div>
                                <Box minHeight={64}>
                                        <ResponseTip backend={backend}/>
                                </Box>
                                 <Box py={2} textAlign={'right'}>
                                    <Button variant='contained' disableElevation disabled={backend.loading} type='submit' color='primary'>Adicionar</Button>                                          
                                </Box>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Dialog>
    )
}

export default FormDialog;


