import React, { useState, useEffect, useCallback } from "react";

import Head from 'next/head'

import { Box, IconButton, Typography } from '@material-ui/core';

import startEndDateToString from "../../src/helpers/startEndDateToString";
import { AuthContext } from '../../src/contexts/AuthContext';
import FormDialog from "../../src/components/galeria/form_dialog";

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Gallery from "react-photo-gallery";

import Carousel, { Modal, ModalGateway } from "react-images";

import mysqldb from "../../src/services/mysqldb";
import DeleteItemDialog from "../../src/components/shared/DeleteItemDialog";
import MyFab from "../../src/components/shared/Fab";

import DeleteOutlinedIcon from "@material-ui/icons/DeleteRounded";

import Slide from 'react-reveal/Slide';
import { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import dateToString from "../../src/helpers/dateToString";



const useStyle = makeStyles((theme) => ({
    fab: {
        marginTop: theme.spacing(3),
    },
}));

function Eventos(props) {
    const classes = useStyle();
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const { isAuthenticated } = useContext(AuthContext);
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const [itemToDelete, setItemToDelete] = useState(null);

    const [openFormDialog, setOpenFormDialog] = useState(false);

    const [photos, setPhotos] = useState(props.data.photos)

    const openLightbox = useCallback((event, { index }) => {
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


    const handleDeleteClick = (item) => () => {
        setItemToDelete(item);
    };
    const handleDeleteClose = (item) => {
        setItemToDelete(null);
    };
    const handleDeletedItem = (deletedItem) => {

        setPhotos(
            photos.filter(
                (item) => deletedItem.id !== item.id
            )
        )

    };

    const renderImageGallery = ({ index, left, top, key, direction, photo, onClick }) => {

        const styleContainer = {
            margin: 1,
            display: 'block',
            position: direction === 'column' ? 'absolute' : 'relative',
            left: direction === 'column' ? left : undefined,
            top: direction === 'column' ? top : undefined,
        }

        return (
            <Box key={key} onClick={!isAuthenticated ? (e) => { onClick(e, { index }) } : null} height={photo.height} width={photo.width} overflow='hidden' style={{ ...styleContainer }}>
                <img alt={photo.descricao} src={photo.src} height={photo.height} width={photo.width} />
                {
                    isAuthenticated &&
                    <IconButton onClick={handleDeleteClick(photo)} style={{ position: 'absolute', top: 'calc(50% - 24px)', left: 'calc(50% - 24px)', color: '#fff', backgroundColor: 'rgba(0, 0, 0, .4)' }}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                }
            </Box >

        )
    }

    return (
        <Box position='relative'>
            <Head>
                <title>{props.data.nome}</title>
                <meta name="description" content={props.data.descricao ? props.data.descricao : `${props.data.tipo}:${props.data.nome}`} />
            </Head>
            <Box width='100%' height={photos.length ? isMobile ? '45vh' : '75vh' : '100vh'} style={{ background: `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)),  center / cover no-repeat url("${process.env.IMAGE_BASE_URL}/${props.data.capaUrl}") fixed` }} bgcolor='#2e2e2e' display='flex' alignItems='center' justifyContent='center' color='#fff'>
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

            {(photos.length > 0) &&
                <>
                    <Box minHeight='80vh' display='flex' flexDirection='column' alignItems='center'>
                        <Box style={{ alignSelf: 'flex-start' }} fontWeight={500} py={isMobile ? 3 : 4} pb={0} px={isMobile ? 1 : 4}>
                            <b>Veja como foi</b>
                        </Box>
                        <Box style={{ alignSelf: 'flex-start' }} mt={0.1} fontSize={'caption.fontSize'} color='text.secondary' pb={2} px={isMobile ? 1 : 4}>
                            {props.data.descricao}
                        </Box>
                        <Box width={isMobile ? '100%' : '95vw'}>
                            <Gallery renderImage={renderImageGallery} photos={photos} onClick={openLightbox} margin={isMobile ? 1 : 2} columns={isMobile ? 3 : 4} direction={'column'} />
                        </Box>
                    </Box>

                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={photos.map(x => ({
                                        ...x,
                                        srcset: x.src,
                                        caption: x.descricao
                                    }))}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>
                </>
            }


            {isAuthenticated && (
                <>
                    <Box position='fixed' bottom={isMobile ? 8*3 : 8*6} right={isMobile ? 8*3 : 8*6}>
                        <MyFab
                            className={classes.fab}
                            text="Adicionar Foto"
                            onClick={() => {
                                setOpenFormDialog(true);
                            }}
                        />
                    </Box>
                    <FormDialog
                        open={openFormDialog}
                        onClose={() => {
                            setOpenFormDialog(false);
                        }}
                        title="Adicionar uma foto"
                        apiUrl="/media"
                        idEvento={props.data.id}
                    />

                    {/*Todo: apagar todas as imagens do evento*/}
                    <DeleteItemDialog
                        item={itemToDelete}
                        title="Apagar esta foto?"
                        apiUrl="/media"
                        onClose={handleDeleteClose}
                        onSucess={handleDeletedItem}
                    >
                        <Typography variant="body2" color='textSecondary' gutterBottom>
                            As pessoas não poderão mais ver esta foto. Esta operação é
                            irreversível!
                        </Typography>

                        <Box mt={2} />

                        {itemToDelete &&
                            <img width={330} alt={itemToDelete.descricao} src={itemToDelete.src} />
                        }
                    </DeleteItemDialog>
                </>
            )}


        </Box>
    );
}

export default Eventos;

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
    const rows = await mysqldb.query(`SELECT * FROM evento WHERE slug = '${params.slug}' AND dataDeInicio <= '${dateToString('Y-M-d h:i:00')}' LIMIT 1`);

    if (!rows.length) return { notFound: true }

    const photosRaw = await mysqldb.query(`SELECT * FROM fotos_evento WHERE idEvento = ${rows[0].id}`)

    await mysqldb.end();

    const photos = photosRaw?.map((photo) => {
        return {
            descricao: photo.descricao,
            src: `${process.env.IMAGE_BASE_URL}/${photo.fotoUrl}`,
            height: 1,
            width: 1,
            id: photo.id,
            fotoUrl: photo.fotoUrl,
        }
    });

    return {
        props: {
            data: {
                ...rows[0],
                photos: photos ? photos : []
            }
        },
        revalidate: 60 * 15
    }
}