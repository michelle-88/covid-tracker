import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Navbar from './Navbar';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(12, 3, 3, 3),
    height: '100vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto'
  },
  footer: {
    marginTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.info.dark
    }
  }
}));

export default function Layout({ title, children }) {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <footer className={classes.footer}>
        Developed by{' '}
        <a href={'https://github.com/michelle-88'}>Michelle Mesorana</a> © 2021
      </footer>
    </Container>
  );
}
