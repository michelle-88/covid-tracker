import axios from 'axios';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Chart from '../../components/Chart';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

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
  }
}));

export default function DetailsPage({ caseData, vaccineData, historicalData }) {
  const classes = useStyles();
  const casesPerMillion = Math.floor(
    (caseData.All.confirmed / caseData.All.population) * 1000000
  );
  const percentFullyVaccinated =
    (vaccineData.All.people_vaccinated / vaccineData.All.population) * 100;
  const percentFormatted = parseFloat(percentFullyVaccinated.toFixed(2));

  return (
    <Layout title={`${caseData.All.country} | COVID-19 Tracker`}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        className={classes.breadcrumbs}
        aria-label='breadcrumb'
      >
        <Link href='/'>
          <a>Home</a>
        </Link>
        <Typography color='textPrimary'>{caseData.All.country}</Typography>
      </Breadcrumbs>
      <Grid container className={classes.container}>
        <div className='leftColumn'>
          <Card className={classes.detailsCard}>
            <div className={classes.countryName}>
              <Typography>{caseData.All.country}</Typography>
            </div>
            <div className={classes.row}>
              <Typography>Confirmed Cases</Typography>
              <Typography>
                {caseData.All.confirmed.toLocaleString('en-US')}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography>Deaths</Typography>
              <Typography>
                {caseData.All.deaths.toLocaleString('en-US')}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography>Cases per Million</Typography>
              <Typography>{casesPerMillion.toLocaleString('en-US')}</Typography>
            </div>
            <div className={classes.row}>
              <Typography>Vaccine Doses Administered</Typography>
              <Typography>
                {vaccineData.All.administered.toLocaleString('en-US')}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography>People Fully Vaccinated</Typography>
              <Typography>
                {vaccineData.All.people_vaccinated.toLocaleString('en-US')}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography>People Partially Vaccinated</Typography>
              <Typography>
                {vaccineData.All.people_partially_vaccinated.toLocaleString(
                  'en-US'
                )}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography>% of Population Fully Vaccinated</Typography>
              <Typography>{`${percentFormatted}%`}</Typography>
            </div>
          </Card>
        </div>
        <div className='rightColumn'>
          <Card className={classes.chartCard}>
            <Chart casesOverTime={historicalData?.All.dates} />
          </Card>
        </div>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const caseResponse = await axios.get(
    `https://covid-api.mmediagroup.fr/v1/cases?ab=${params.id}`
  );
  const vaccineResponse = await axios.get(
    `https://covid-api.mmediagroup.fr/v1/vaccines?ab=${params.id}`
  );
  const historicalResponse = await axios.get(
    `https://covid-api.mmediagroup.fr/v1/history?ab=${params.id}&status=confirmed`
  );

  return {
    props: {
      caseData: caseResponse.data,
      vaccineData: vaccineResponse.data,
      historicalData: historicalResponse.data
    }
  };
}
