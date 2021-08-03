import * as React from 'react';
import {useRouter} from 'next/router';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SobreMenu from "./SobreMenu";
import Box from "@material-ui/core/Box";
import { withStyles } from '@material-ui/styles';

const StyledTabs = withStyles((theme) => ({
  root:{
    overflow:'visible'
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(({typography, spacing}) => ({
  root: {
    textTransform: 'none',
    color: 'inherit',
    minWidth:100,
    overflow:'visible',
    fontWeight: 'bold',
    fontSize: typography.pxToRem(15),
    marginRight: spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))(props => <Tab disableRipple {...props} />);

export default function TopTabs(props) {
  const router = useRouter();

  const handleClick=(route)=>()=>{

    router.push(route);
  }

  return (
    <Box overflow='visible'>
      <StyledTabs value={props.value || 0} aria-label="styled tabs example">
        <StyledTab onClick={handleClick('/eventos')} label="Eventos" />
        <StyledTab onClick={handleClick('/pregacoes')} label="Pregações" />

        <StyledTab onClick={handleClick('/musicas')} label="Músicas" />

        <SobreMenu home={props.home}>
          <StyledTab label='Sobre' />
        </SobreMenu>
        <StyledTab label="Doar" onClick={handleClick('/doar')} />
      </StyledTabs>
    </Box>
  );
}