import React from "react";
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';



export default function ScrollTrigger2({children, y=0,onSuccess,offset=0, customRef,...props}){
	

	const [dimensions, setDimensions]  = React.useState(null);
	

	const elementRef = React.useCallback(node => {
	    if (node !== null) {
	    	setDimensions({
	    		height: node.getBoundingClientRect().height,
	    		y: node.getBoundingClientRect().y,
	    	})
	    }
	  }, []);

	const trigger = useScrollTrigger({
		offset: offset,
		target: dimensions,
	    positionY: y, 
	    // target: window ? window() : undefined,
	  });
	

	React.useEffect(()=>{

		if(trigger){
		 	
		  	onSuccess();
	  	}
	}, [trigger]);
	
  	
  	const prop = customRef?{
			_ref: elementRef
		  }:{
			ref: elementRef
		  };

	return React.cloneElement(children, prop);
}






function useScrollTrigger({target, positionY=0}) {
	const [trigger, setTrigger]  = React.useState(false);


	
	React.useEffect(()=>{
		let ticking = false;
		let lastKnownScrollPosition = 0;

		const compareY = (actualY, prevY)=>{
			let screenSize = document.body.getBoundingClientRect();
			let offset = (screenSize.width*screenSize.height)/1000;
			if(offset>400){
				offset = 100;
			}else{
				offset = 338.253; 
			}
			let direction = actualY>prevY?offset:0;  

			if(target){
				if(actualY+positionY>=(Number(target.y)+direction) && actualY+positionY<=(Number(target.y)+target.height+direction)){
				// console.log(actualY, positionY,  actualY>=Number(target.y) && actualY<=Number(target.y)+target.height);             
					setTrigger(true);       
				}else{
					setTrigger(false);
				}
			}
			
		};

		const handleScroll = function() {
		  

			  if (!ticking) {
			    window.requestAnimationFrame(function() {
			      compareY(window.scrollY, lastKnownScrollPosition);
			      ticking = false;
			    });
			    lastKnownScrollPosition = window.scrollY;
			    ticking = true;
		  	}
	  	} 

	    handleScroll(); // Re-evaluate trigger when dependencies change

	    document.addEventListener('scroll', handleScroll);
	    return function () {
	      document.removeEventListener('scroll', handleScroll);
	    }; // See Option 3. https://github.com/facebook/react/issues/14476#issuecomment-471199055
	},[]);
	//Guardar o estado actual


	return trigger;
}


function usePrevious(value) {
  const ref =  React.useRef();
   React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
