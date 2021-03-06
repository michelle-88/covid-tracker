import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { CustomThemeContext } from '../theme/CustomThemeProvider';
import ThemeToggle from './ThemeToggle';
import CoronavirusPNG from '../public/Coronavirus.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1.5),
    fontFamily: 'Ubuntu',
    '& strong': {
      cursor: 'pointer'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px'
    }
  }
}));

function ElevationScroll({ children, window }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

export default function Navbar() {
  const classes = useStyles();
  const { darkMode, updateCurrentTheme } = useContext(CustomThemeContext);

  return (
    <div className={classes.root}>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Image
              src={CoronavirusPNG}
              alt='COVID virus logo'
              width={36}
              height={36}
              className={classes.logo}
            />
            <Link href='/' passHref>
              <Typography variant='h5' className={classes.title}>
                <strong>COVID-19 Tracker</strong>
              </Typography>
            </Link>
            <ThemeToggle
              darkMode={darkMode}
              updateCurrentTheme={updateCurrentTheme}
            />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
}
