import React, { useState } from 'react';

import { Box, Typography } from '@material-ui/core';

import ReactPlayer from 'react-player'
import dateToString from '../../src/helpers/dateToString';

import mysqldb from "../../src/services/mysqldb";
import useWindowDimensions from '../../src/helpers/hooks/useWindowDimensions';

import useMediaQuery from '@material-ui/core/useMediaQuery';

function PregacaoDetailPage(props) {
    const dimensions = useWindowDimensions();
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const [playerData, setPlayerData] = useState({
        isLoadingVideo: true,
        hasError: false
    });

    const widthPlayer = isMobile ? dimensions.width : (dimensions.width * 0.70);
    const heightPlayer = (isMobile ? dimensions.width : (dimensions.width * 0.70)) / (16 / 9);

    const onReadyPlayer = () => {
        setPlayerData({
            isLoadingVideo: false,
            hasError: false
        })
    }

    const onErrorPlayer = () => {
        setPlayerData({
            isLoadingVideo: false,
            hasError: true
        })
    }

    React.useEffect(() => {
        props.setTabSelectedIndex(-1);
    }, [])

    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <Box my={8}>

                <Box p={1} px={2} fontWeight='bold' fontSize={'h2.fontSize'} textAlign='center'>
                    {props.data.tema}
                </Box>
                <Typography gutterBottom align='center' variant='body2'>
                    {props.data.pregador}
                </Typography>

            </Box>

            <Box position='relative' bgcolor='#2e2e2e' width={widthPlayer-1} height={heightPlayer-2.3}>
                <ReactPlayer onReady={onReadyPlayer} onError={onErrorPlayer} width={widthPlayer} height={heightPlayer} url={props.data.linkDoVideo} />
                {playerData.isLoadingVideo &&
                    <Box width='100%' textAlign="center" style={{
                        top: 'calc(50% - 24px)',
                        left:'center',
                        position: 'absolute'
                    }} color='#fff' px={2}>
                        Carregando a pregação...
                    </Box>
                }
                {playerData.hasError &&
                    <Box width='100%' textAlign="center" style={{
                        left: 'center',
                        top: 'calc(50% - 24px)',
                        position: 'absolute'
                    }} fontWeight='bold' fontSize='h6.fontSize' color='#fff' px={2}>
                        Ooophs! Ocorreu um erro ao carregar a pregação
                    </Box>
                }
            </Box>


            <Box width={isMobile ? '100%' : '73%'} style={{ alignSelf: isMobile ? 'flex-start' : 'center' }} my={4}>
                <Box fontWeight={500} mx={2} mb={1}>
                    Sobre a pregação
                </Box>
                <Box color='text.secondary' textAlign='justify' mx={2} mb={1.5}>
                    {props.data.breveDescricao}
                </Box>

                <Box color='text.secondary' fontSize='caption.fontSize' mx={2}>
                    Aos {dateToString('d $de m $de Y', props.data.data)}
                </Box>
            </Box>
        </Box>
    );
}


export default PregacaoDetailPage;

export async function getStaticPaths() {
    const rows = await mysqldb.query(`SELECT slug FROM pregacao LIMIT 10`);

    await mysqldb.end();

    const paths = rows.map((pregacao) => ({ params: { ...pregacao } }));

    return {
        paths,
        fallback: 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const rows = await mysqldb.query(`SELECT * FROM pregacao WHERE slug = '${params.slug}' LIMIT 1`);

    await mysqldb.end();

    if (!rows.length) return { notFound: true }

    return {
        props: {
            data: {
                ...rows[0],
            }
        }
    }
}