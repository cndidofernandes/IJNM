import React from "react";
import { Box, Dialog } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import api from "../../services/api";

import ResponseTip from "../shared/ResponseTip";
import Toolbar from "./ToolbarFormDialog";

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";

import { getErrorBackend } from "../../helpers/errors";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function DeleteItemDialog({ item, onSucess, onClose, title, apiUrl, children }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const formRef = useRef(null);
    const [hiddenImagePreview, setHiddenImagePreview] = useState(false);

    const [backend, setBackend] = useState({
        loading: false,
        data: null,
        error: null,
    });

    React.useEffect(() => {
        setBackend({
            loading: false,
            data: null,
            error: null,
        });
    }, [item]);

    const { register, handleSubmit } = useForm();

    const myHandleSubmit = async (data) => {
        setBackend({
            data: null,
            error: null,
            loading: true,
        });

        try {

            /*if(!item.id ){
                throw new Error('O item a ser apagado não foi encontrado');
            }*/

            await api.delete(apiUrl + `?${item.id ? 'id' : 'slug'}=${item.id || item.slug}&capaUrl=${item.capaUrl || item.fotoUrl}`);

            if (onSucess) onSucess(item);

            setBackend({
                data: {
                    message: "O Item foi apagado com sucesso. Poderá levar alguns minutos para poderes visualizar no site.",
                },
                error: null,
                loading: false,
            });

            onClose();
        } catch (error) {

            setBackend({
                data: null,
                error: getErrorBackend(error, {
                    404: 'Este item já foi apagado da base de dados. Poderá levar alguns minutos para poderes ver o item removido do site.',
                    400: "Ocorreu um erro ao apagar o item no site.",
                    500: "Algo de estranho aconteceu ao apagar o item no site. Por favor, tente novamente.",
                }),
                loading: false,
            });
        }
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth={"sm"}
            open={!!item}
            onClose={backend.loading ? () => { } : onClose}
        >
            <form
                ref={formRef}
                onSubmit={handleSubmit(myHandleSubmit)}
                onReset={() => setHiddenImagePreview(true)}
            >
                <Toolbar
                    title={title}
                    onClose={backend.loading ? () => { } : onClose}
                    isSubmitting={backend.loading}
                />

                <Container>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={8} md={6} lg={8}>

                            {children}

                            <Box mt={1} minHeight={64}>
                                <ResponseTip backend={backend} />
                            </Box>
                            <Box py={2} textAlign={"right"}>
                                {(backend.loading || backend.error || item) ? (
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        disabled={backend.loading}
                                        type="submit"
                                        color="primary"
                                    >
                                        Apagar
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        onClick={onClose}
                                        type="button"
                                        color="primary"
                                    >
                                        Fechar
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Dialog>
    );
}
