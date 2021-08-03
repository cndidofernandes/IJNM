import React from 'react';
import {useRouter} from 'next/router'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles( theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    paddingTop: theme.spacing(1.5),
    marginRight: theme.spacing(2),
    zIndex: theme.zIndex.drawer,
    border: '2px solid #f0f0f0'
  },
}));

export default function SobreMenu({home, children}) {
  const classes = useStyle();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const router = useRouter();

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleClick = (page) => event => {
    router.push(page)

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  React.useEffect(()=>{
    // children.props.onClick=handleToggle
  },[])
  return (
    <div className={classes.root}>
      <div>
        <div onClick={handleToggle} ref={anchorRef}>
          {children}
        </div>
        <Popper open={open} anchorEl={anchorRef.current} transition style={{zIndex:1200,marginTop:0/*home?-6*8:(0)*/}}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper elevation={0} id="menu-list-grow" className={classes.paper}>
                <Box mx='auto' mt={-2} width={16} height={2} border={'2px solid #fff'} borderRadius={100} bgcolor='#2e1534'/>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClick('/servicos')}>Nossos Serviços</MenuItem>
                    <MenuItem onClick={handleClick('/lideranca')}>Nossa Liderança</MenuItem>
                    <MenuItem onClick={handleClick('/sobre')}>Nossa História</MenuItem>

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
