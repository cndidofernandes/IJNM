import React, { useState } from 'react';

import { Box, Grid, Typography, List, ListItem, ListItemText, ListItemIcon, ListSubheader, ListItemAvatar, Button, Avatar, Toolbar, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from "@material-ui/icons/Search";

import dateToString from "../../../src/helpers/dateToString";

import mysqldb from "../../../src/services/mysqldb";

import api from '../../../src/services/api';
import { getErrorBackend } from "../../../src/helpers/errors";
import { AuthContext } from '../../../src/contexts/AuthContext';

import CircularProgress from '@material-ui/core/CircularProgress';

import Router from 'next/router'

import Head from 'next/head'

// import { Container } from './styles';

const pageSize = 20;

const DashboardDoacao = ({ dateQuery, backend, loadMoreDoacoes, loadDoacoesByCriadoEm, handleDoacaoItemClick }) => {
    const [dateQueryInput, setDateQueryInput] = React.useState(dateQuery)

    const handleDateQueryInput = (name) => (e) => {

        if (name === 'fromDate')
            setDateQueryInput({ ...dateQueryInput, from: e.target.value })

        if (name === 'untilDate')
            setDateQueryInput({ ...dateQueryInput, until: e.target.value })

    }

    return (
        <Box display='flex' flexDirection='column' mx={4} my={4}>
            <Box fontSize={'h4.fontSize'} fontWeight='fontWeightBold'>
                Doações Feitas
            </Box>
            <Box fontSize={'0.73rem'} color='text.secondary'>
                Os resultados apresentados são referentes a {dateQueryInput.from} á {dateQueryInput.until}
            </Box>

            <Box alignSelf='flex-end' mb={4} mt={3}>
                <form onSubmit={loadDoacoesByCriadoEm(dateQueryInput)}>
                    <Grid container alignItems='center' spacing={1}>
                        <Grid item xs={12} sm={5}>
                            <input onChange={handleDateQueryInput('fromDate')} type='date' required />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <input onChange={handleDateQueryInput('untilDate')} type='date' required />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <IconButton disabled={backend.loading} size='small' style={{ backgroundColor: '#000', color: '#fff', borderRadius: 0, paddingLeft: 14, paddingRight: 14 }} type='submit'>
                                <SearchIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </form>
            </Box>

            {
                (backend.loading && !backend?.data.listDoacao.length)
                    ?

                    <Box width='100%' py={8} display='flex' alignItems='center' justifyContent='center'>
                        <Box width='auto' mx='auto'>
                            <CircularProgress />
                        </Box>
                    </Box>

                    :
                    (backend.error && !backend.data.listDoacao.length)
                        ?

                        <Box fontSize='body2.fontSize' color='text.secondary'>{backend.error.message}</Box>

                        :

                        <>
                            <Grid container justifyContent='space-between'>
                                <Grid item xs={12} sm={5}>

                                    <Box p={2} my={1} borderRadius={8} borderColor="grey.300" border={1} component={'div'}>
                                        <Typography variant={'caption'} style={{ marginLeft: 8, marginTop: 8 }} color={'textSecondary'}>
                                            Número de doações feitas:
                                        </Typography>
                                        <Typography variant={'h5'} align={'center'} style={{ margin: 16, fontWeight: 'medium' }}>
                                            {backend.data.n_doacoes}
                                        </Typography>
                                    </Box>

                                </Grid>
                                <Grid item xs={12} sm={5} >
                                    <Box p={2} my={1} borderRadius={8} borderColor="grey.300" border={1} component={'div'}>
                                        <Typography variant={'caption'} style={{ marginLeft: 8, marginTop: 8 }} color={'textSecondary'}>
                                            Total arrecadado:
                                        </Typography>
                                        <Typography variant={'h5'} align={'center'} style={{ margin: 16, fontWeight: 'medium' }}>
                                            {maskTotal(backend.data.total_arrecadado)} Kz
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box mt={3}>

                                <List subheader={<ListSubheader>Doações feitas</ListSubheader>}>
                                    {backend?.data.listDoacao.map((doacao, index) =>
                                    (
                                        <ListItem key={index} button onClick={handleDoacaoItemClick(index)}>
                                            <ListItemIcon>
                                                <PersonIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box display='flex'>
                                                        <Typography noWrap component="span" variant="body2" style={{ fontWeight: 'bold', marginRight: 4 }} color="textPrimary">
                                                            {`${doacao.primeiro_nome} ${doacao.ultimo_nome}`}
                                                        </Typography>
                                                        <Typography noWrap color="textSecondary" variant="body2">
                                                            - {doacao.mensagem}
                                                        </Typography>
                                                    </Box>
                                                }
                                                secondaryTypographyProps={{ variant: "caption" }}
                                                secondary={`Valor enviado: ${maskTotal(doacao.valor)} Kz`}
                                            />
                                            <Typography variant='caption'>
                                                {dateToString(' d/M', doacao.criadoEM)}
                                            </Typography>
                                        </ListItem>
                                    )
                                    )
                                    }
                                    {!backend?.data.listDoacao.length &&
                                        <Box py={1} fontSize='body2.fontSize' color='text.secondary'>
                                            {`Nenhuma doação foi feita entre ${dateQueryInput.from} e ${dateQueryInput.until}. Por favor, volte mais tarde.`}
                                        </Box>
                                    }
                                </List>

                                {backend?.data?.hasMore &&
                                    <Box textAlign='center' mt={2.5}>
                                        {!(backend.error && backend.error.status === 404) &&
                                            <Button disabled={backend.loading} onClick={loadMoreDoacoes} color='primary' size="medium" variant='contained' style={{ border: 'none', boxShadow: 'none' }}>
                                                {backend.loading ? "Carregando mais doações..." : "Carregar mais"}
                                            </Button>
                                        }
                                        {backend.error &&
                                            <Box mt={1.5} fontSize='caption.fontSize' color={backend.error.status === 404 ? "text.secondary" : "error.main"}>{backend.error.message}</Box>
                                        }
                                    </Box>
                                }

                            </Box>
                        </>
            }

        </Box >
    )

}

const DoacaoDetalhe = ({ doacao, closeDoacaoDetalhe }) => {

    return (
        <>
            <Box mt={5} mx={3} borderRadius={8} borderColor="grey.300" border={1}>

                <Toolbar style={{ paddingLeft: 4 }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${doacao.primeiro_nome} ${doacao.ultimo_nome}`} secondary={doacao.email} />
                    </ListItem>
                    <Typography style={{ flexGrow: 1 }} />
                    <Button type='submit' size='small' color='primary' onClick={closeDoacaoDetalhe}>Voltar</Button>
                </Toolbar>

                <Box mx={3} my={2}>

                    <Box>
                        <Typography variant='subtitle1'>
                            <b>Mais informações sobre a doação</b>
                        </Typography>

                        <Box display='flex' alignItems='center' mt={2}>
                            <Box fontWeight="fontWeightMedium" color='text.secondary'>
                                Valor:
                            </Box>
                            <Box fontSize='body2.fontSize' color='text.secondary' ml={2}>
                                {doacao.valor}
                            </Box>
                        </Box>

                        <Box display='flex' alignItems='center' mt={1}>
                            <Box fontWeight="fontWeightMedium" color='text.secondary'>
                                Morada:
                            </Box>
                            <Box fontSize='body2.fontSize' color='text.secondary' ml={2}>
                                {doacao.morada}
                            </Box>
                        </Box>

                        <Box display='flex' alignItems='center' mt={1}>
                            <Box fontWeight="fontWeightMedium" color='text.secondary'>
                                Mensagem:
                            </Box>
                            <Box fontSize='body2.fontSize' color='text.secondary' ml={2}>
                                {doacao.mensagem}
                            </Box>
                        </Box>

                    </Box>

                    <Box my={3} mb={2}>
                        <img style={{ maxWidth: '312px' }} src={`${process.env.IMAGE_BASE_URL}/${doacao.comprovativoUrl}`} alt={'Imagem do comprovativo'} />
                    </Box>

                    <Typography variant='caption' color='textSecondary'>
                        Doação feita aos {dateToString('d/M/Y', doacao.criadoEM)}
                    </Typography>

                </Box>
            </Box>

        </>
    )

}

function DoacaoPage({ data, setTabSelectedIndex }) {
    const { isAuthenticated } = React.useContext(AuthContext);
    const [renderCounter, setRenderCounter] = useState(0)

    const [backend, setBackend] = React.useState({
        loading: false,
        data,
        error: null
    });

    const [dateQuery, setDateQuery] = useState({
        from: dateToString('Y-M-01'),
        until: dateToString('Y-M-d'),
    })

    const [doacaoCliked, setDoacaoCliked] = useState(null)

    const handleDoacaoItemClick = (indexInArray) => (e) => {
        setDoacaoCliked(backend.data.listDoacao[indexInArray])
    }

    const closeDoacaoDetalhe = () => {
        setDoacaoCliked(null)
    }

    const loadMoreDoacoes = () => {

        loadDoacoesFromApi({
            dateQueryFrom: dateQuery.from,
            offsetDate: backend?.data?.listDoacao[backend?.data.listDoacao.length - 1]?.criadoEM,
        })

    }

    const loadDoacoesByCriadoEm = (dateQueryInput) => (e) => {
        e.preventDefault();

        setDateQuery(dateQueryInput)

        loadDoacoesFromApi({ dateQueryFrom: dateQueryInput.from + ' 00:00:00', dateQueryUntil: dateQueryInput.until + ' 23:59:59', }, {
            '404': `Não foi encontrado doações feitas no periodo de ${dateQueryInput.from} á ${dateQueryInput.until}. Por favor, selecione um outro periodo.`,
        }, true)

    }

    const loadDoacoesFromApi = (params = {}, errors = {}, isRestoreBackendData) => {

        setBackend({
            data: isRestoreBackendData ? { hasMore: false, listDoacao: [], } : { ...backend.data },
            loading: true,
            error: null
        })

        api.get('/give', {
            params: {
                pageSize,
                ...params
            },
        }).then(function ({ data }) {
            const res = data.success;

            console.log(res);

            setBackend({
                ...backend,
                data: {
                    hasMore: res.data.length >= pageSize,
                    ...(isRestoreBackendData ? { ...res.doacoesResume } : { n_doacoes: backend.data.n_doacoes, total_arrecadado: backend.data.total_arrecadado }),
                    listDoacao: isRestoreBackendData ? [...res.data] : [...backend?.data?.listDoacao, ...res.data],
                },
                error: null,
                loading: false
            })

        }).catch(function (error) {

            setBackend({
                data: isRestoreBackendData ? { hasMore: false, listDoacao: [], } : { ...backend.data },
                error: getErrorBackend(error, {
                    '404': `Não tem mais doações para carregar...`,
                    ...errors
                }),
                loading: false
            })

        });

    }

    React.useEffect(() => {

        setRenderCounter(renderCounter + 1)

        if (!isAuthenticated && renderCounter === 1) {
            Router.push('/')
        }

        setTabSelectedIndex(-1);
    }, [isAuthenticated]);


    if (!isAuthenticated) return <Box p={3} textAlign='center'>Autenticando...</Box>

    return (
        <>
            <Head>
                <title>Doações Feitas</title>
                <meta name="description" content='Veja as doações que foram feitas para igreja' />
            </Head>
            {
                !doacaoCliked
                    ?
                    <DashboardDoacao dateQuery={dateQuery} backend={backend} handleDoacaoItemClick={handleDoacaoItemClick} loadMoreDoacoes={loadMoreDoacoes} loadDoacoesByCriadoEm={loadDoacoesByCriadoEm} />
                    :
                    <DoacaoDetalhe doacao={doacaoCliked} closeDoacaoDetalhe={closeDoacaoDetalhe} />
            }
        </>
    )

}

function maskTotal(money) {

    let moneyConverted = String(money);

    const numberOfPoint = (moneyConverted.length % 3) === 0 ? Math.floor(moneyConverted.length / 3) - 1 : Math.floor(moneyConverted.length / 3);

    let remainingDigitNumber = moneyConverted.length;
    let digits = [];

    for (let i = 0; i < numberOfPoint; i++) {

        digits.push(moneyConverted.substring(remainingDigitNumber - 3, remainingDigitNumber));
        remainingDigitNumber -= 3;
    }

    let moneyWithMask = moneyConverted.substring(0, remainingDigitNumber);

    for (let i = 1; i <= digits.length; i++)
        moneyWithMask += `.${digits[digits.length - i]}`;


    return moneyWithMask
}

export async function getStaticProps() {
    const rowsDoacoes = await mysqldb.query(`SELECT * FROM doacao WHERE criadoEM >= '${dateToString('Y-M-01 00:00:00')}' ORDER BY id DESC LIMIT 0,20`);

    const rowDoacoesResume = await mysqldb.query(`SELECT COUNT(doacao.id) as n_doacoes, SUM(doacao.valor) as total_arrecadado FROM doacao WHERE criadoEM >= '${dateToString('Y-M-01 00:00:00')}'`);

    await mysqldb.end();

    const listDoacao = rowsDoacoes.map((evento) => { return { ...evento } });

    return {
        props: {
            data: {
                hasMore: listDoacao.length >= pageSize - 1,
                n_doacoes: rowDoacoesResume[0].n_doacoes,
                total_arrecadado: rowDoacoesResume[0].total_arrecadado,
                listDoacao
            }
        },
        revalidate: 60 * 60 * 15
    }

}

export default DoacaoPage;