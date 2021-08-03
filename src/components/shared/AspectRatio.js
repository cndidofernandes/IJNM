import * as React from 'react';
import Box  from '@material-ui/core/Box';


export default function AspectRatio({width, height, aspectRatio, children, ...rest}) {
	const [tamanho, setTamanho] = React.useState({});

  	const measuredRef = React.useCallback(node => {
	    if (node && node.length) {
	      setTamanho(node.getBoundingClientRect());
	    }
	  }, []);


    return(
        <Box ref={measuredRef} width={width?width:tamanho.height*aspectRatio} {...rest} height={tamanho.width/aspectRatio}  >
           {children}
        </Box>
    )
}
