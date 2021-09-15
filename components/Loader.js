import Layout from './Layout';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'rgb(255, 99, 132)'
  }
}));

export default function Loader({ open }) {
  const classes = useStyles();
  return (
    <Layout title='COVID-19 Tracker'>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color='inherit' size={65} />
      </Backdrop>
    </Layout>
  );
}
