import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2.5),
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    borderRadius: '6px',
    boxShadow:
      'rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px'
  },
  loader: {
    flex: 1
  },
  skeleton: {
    margin: '0 auto'
  }
}));

export default function SkeletonTable() {
  const classes = useStyles();

  return Array(15)
    .fill()
    .map((item, index) => (
      <Card className={classes.row} key={index}>
        <div className={classes.loader}>
          <Typography>
            <Skeleton width={'50%'} />
          </Typography>
        </div>
        <div className={classes.loader}>
          <Typography>
            <Skeleton width={'50%'} className={classes.skeleton} />
          </Typography>
        </div>
        <Hidden xsDown>
          <div className={classes.loader}>
            <Typography>
              <Skeleton width={'50%'} className={classes.skeleton} />
            </Typography>
          </div>
          <div className={classes.loader}>
            <Typography>
              <Skeleton width={'50%'} className={classes.skeleton} />
            </Typography>
          </div>
        </Hidden>
      </Card>
    ));
}
