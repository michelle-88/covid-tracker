import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCountryData } from '../../lib/useCountryData';
import { useHistoricalData } from '../../lib/useHistoricalData';
import Layout from '../../components/Layout';
import Chart from '../../components/Chart';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    marginBottom: theme.spacing(2),
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  container: {
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gap: '24px',
      '& .leftColumn': {
        gridColumn: '1 / span 4'
      },
      '& .rightColumn': {
        gridColumn: '5 / span 8'
      }
    },
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '24px'
  },
  detailsCard: {
    borderRadius: '6px',
    padding: theme.spacing(2.5)
  },
  countryName: {
    '& p': {
      fontSize: theme.spacing(3.5)
    }
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2.5, 0, 2.5, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& p': {
      fontSize: '15px'
    },
    '& p:first-of-type': {
      color: theme.palette.text.secondary,
      [theme.breakpoints.down('md')]: {
        maxWidth: '180px'
      }
    },
    '& p:last-of-type': {
      color: theme.palette.text.primary
    },
    '&:last-child': {
      border: 'none',
      paddingBottom: 0
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  chartCard: {
    position: 'relative',
    borderRadius: '6px',
    padding: theme.spacing(1.25, 2.5, 3.75, 2.5),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      width: '95vw',
      margin: '0 auto'
    },
    [theme.breakpoints.down('xs')]: {
      height: '40vh',
      width: '91.5vw',
      padding: theme.spacing(1.25, 2, 2, 2)
    }
  },
  skeletonDiv: {
    paddingTop: '49%',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '92%'
    }
  }
}));

export default function DetailsPage() {
  const classes = useStyles();
  const router = useRouter();

  const {
    countryData,
    isLoading: countryLoading,
    isError: countryError
  } = useCountryData(router.query.country, router.query.iso);
  const {
    historicalData,
    isLoading: historicalLoading,
    isError: historicalError
  } = useHistoricalData(router.query.iso);

  const recoveredInteger =
    !countryLoading && parseInt(countryData[0].TotalRecovered);
  const testsInteger = !countryLoading && parseInt(countryData[0].TotalTests);

  return (
    <Layout title={`${router.query.country} | COVID-19 Tracker`}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        className={classes.breadcrumbs}
        aria-label='breadcrumb'
      >
        <Link href='/'>
          <a>Home</a>
        </Link>
        <Typography color='textPrimary'>{router.query.country}</Typography>
      </Breadcrumbs>
      <Grid container className={classes.container}>
        <div className='leftColumn'>
          <Card className={classes.detailsCard}>
            <div className={classes.countryName}>
              <Typography>{router.query.country}</Typography>
            </div>
            <div className={classes.row}>
              <Typography>Active Cases</Typography>
              <Typography>
                {countryLoading ? (
                  <Skeleton width={100} />
                ) : (
                  countryData[0].ActiveCases.toLocaleString('en-US')
                )}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography>Critical Cases</Typography>
              <Typography>
                {countryLoading ? (
                  <Skeleton width={100} />
                ) : (
                  countryData[0].Serious_Critical.toLocaleString('en-US')
                )}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography>Total Cases</Typography>
              <Typography>
                {countryLoading ? (
                  <Skeleton width={100} />
                ) : (
                  countryData[0].TotalCases.toLocaleString('en-US')
                )}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography>Total Cases per Million</Typography>
              <Typography>
                {countryLoading ? (
                  <Skeleton width={100} />
                ) : (
                  countryData[0].TotCases_1M_Pop.toLocaleString('en-US')
                )}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography>Total Recovered</Typography>
              <Typography>
                {countryLoading ? (
                  <Skeleton width={100} />
                ) : (
                  recoveredInteger.toLocaleString('en-US')
                )}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography>Total Deaths</Typography>
              <Typography>
                {countryLoading ? (
                  <Skeleton width={100} />
                ) : (
                  countryData[0].TotalDeaths.toLocaleString('en-US')
                )}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography>Total Tests Conducted</Typography>
              <Typography>
                {countryLoading ? (
                  <Skeleton width={100} />
                ) : (
                  testsInteger.toLocaleString('en-US')
                )}
              </Typography>
            </div>
          </Card>
        </div>
        <div className='rightColumn'>
          <Card className={classes.chartCard}>
            {historicalLoading ? (
              <Skeleton variant='rect' width={'100%'} style={{ marginTop: 8 }}>
                <div className={classes.skeletonDiv} />
              </Skeleton>
            ) : (
              <Chart casesOverTime={historicalData} />
            )}
          </Card>
        </div>
      </Grid>
    </Layout>
  );
}
