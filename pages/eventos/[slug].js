import React, { useState, useEffect, useCallback } from "react";

import Head from 'next/head'

import { Box, Typography } from '@material-ui/core';

import startEndDateToString from "../../src/helpers/startEndDateToString";

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Gallery from "react-photo-gallery";

import Carousel, { Modal, ModalGateway } from "react-images";

import mysqldb from "../../src/services/mysqldb";

import Slide from 'react-reveal/Slide';


function EventoPage(props) {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    useEffect(() => {
        props.setTabSelectedIndex(6);
    }, []);

    return (
        <Box>
            <Head>
                <title>{props.data.nome}</title>
                <meta name="description" content={props.data.descricao ? props.data.descricao : `${props.data.tipop}:${props.data.nome}`} />
            </Head>
            <Box width='100%' height={props.data.photos.length ? isMobile ? '45vh' : '75vh' : '100vh'} style={{ background: `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)),  center / cover no-repeat url("${props.data.capaUrl}") fixed` }} bgcolor='#2e2e2e' display='flex' alignItems='center' justifyContent='center' color='#fff'>
                <Slide bottom cascade>
                    <Box>
                        <Box p={1} px={2} color='#fff' fontWeight='bold' fontSize={isMobile ? 'h2.fontSize' : 'h1.fontSize'} textAlign='center'>
                            {props.data.nome}
                        </Box>
                        <Typography gutterBottom align='center' variant='body2'>
                            {props.data.local}
                        </Typography>
                        <Typography gutterBottom align='center' variant='body2'>
                            {startEndDateToString(props.data.dataDeInicio, props.data.dataDeTermino)}
                        </Typography>
                    </Box>
                </Slide>
            </Box>

            {(props.data.photos.length > 0) &&
                <>
                    <Box minHeight='80vh' display='flex' flexDirection='column' alignItems='center'>
                        <Box style={{ alignSelf: 'flex-start' }} fontWeight={500} py={isMobile ? 3 : 4} pb={0} px={isMobile ? 1 : 4}>
                            <b>Veja como foi</b>
                        </Box>
                        <Box style={{ alignSelf: 'flex-start' }} mt={0.1} fontSize={'caption.fontSize'} color='text.secondary' pb={2} px={isMobile ? 1 : 4}>
                            {props.data.descricao}
                        </Box>
                        <Box width={isMobile ? '100vw' : '95vw'}>
                            <Gallery photos={props.data.photos} onClick={openLightbox} margin={isMobile ? 1 : 2} columns={3} direction={isMobile ? 'column' : 'row'} />
                        </Box>
                    </Box>

                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={props.data.photos.map(x => ({
                                        ...x,
                                        srcset: x.srcSet,
                                        caption: x.title
                                    }))}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>
                </>
            }
        </Box>
    );
}

export default EventoPage;

export async function getStaticPaths() {
    const rows = await mysqldb.query(`SELECT slug FROM evento LIMIT 10`);

    await mysqldb.end();

    const paths = rows.map((evento) => ({ params: { ...evento } }));

    return {
        paths,
        fallback: 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const rows = await mysqldb.query(`SELECT * FROM evento WHERE slug = '${params.slug}' LIMIT 1`);

    if (!rows.length) return { notFound: true }

    const photosRaw = await mysqldb.query(`SELECT * FROM fotos_evento WHERE idEvento = ${rows[0].id}`)

    await mysqldb.end();
    
    const photos = photosRaw?.map((photo) => {
        return {
            ...photo,
            height: 1,
            width: 1,
        }
    });

    return {
        props: {
            data: {
                ...rows[0],
                photos: photos ? photos : []
            }
        }
    }
}