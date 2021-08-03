import Box from '@material-ui/core/Box';

export default function ResponseTip({backend, loadingMessage, ...rest}) {

    if(backend.loading){
        return (
            <Box {...rest} fontSize='caption' color='#607d8b' p={1} borderRadius={6} bgcolor='#eceff1'>
                {loadingMessage || "Aguarde..."}
            </Box>
        )
    }else if(backend.error){
        return (
            <Box {...rest} fontSize='caption' fontWeight={500} color='error.main' p={1} bgcolor='#ffebee' borderRadius={6}>
                {backend.error.message}
            </Box>
        )
    }

    return (
            
            <Box {...rest} fontSize='caption' color='#009688' p={1} borderRadius={6} bgcolor={(backend.data && backend.data.message)?'#e0f2f1':undefined}>
                {backend.data  && backend.data.message}
            </Box>
        )

}

