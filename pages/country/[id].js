import axios from 'axios';
import Layout from '../../components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  detailsCard: {
    maxWidth: '60vw',
    minWidth: 'fit-content',
    margin: '0 auto',
    padding: theme.spacing(2.5),
    [theme.breakpoints.down('md')]: {
      maxWidth: '90vw'
    }
  },
  heading: {
    marginBottom: theme.spacing(2)
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2.5),
    borderBottom: '1px solid #e0e0e0',
    '&:last-child': {
      border: 'none',
      paddingBottom: 0
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  }
}));

export default function DetailsPage({ caseData, vaccineData }) {
  const classes = useStyles();
  const casesPerMillion = Math.floor(
    (caseData.All.confirmed / caseData.All.population) * 1000000
  );
  const percentFullyVaccinated =
    (vaccineData.All.people_vaccinated / vaccineData.All.population) * 100;
  const percentFormatted = parseFloat(percentFullyVaccinated.toFixed(2));
  return (
    <Layout title={`${caseData.All.country} | COVID-19 Tracker`}>
      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.detailsCard}>
            <div className={classes.heading}>
              <Typography variant='h4'>{caseData.All.country}</Typography>
            </div>
            <div className={classes.row}>
              <Typography>Confirmed Cases</Typography>
              <Typography>
                {caseData.All.confirmed.toLocaleString('en-US')}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography>Recovered</Typography>
              <Typography>
                {caseData.All.recovered.toLocaleString('en-US')}
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
        </Grid>
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

  return {
    props: {
      caseData: caseResponse.data,
      vaccineData: vaccineResponse.data
    }
  };
}

// export async function getStaticPaths() {
//   const res = await axios.get('https://covid-api.mmediagroup.fr/v1/cases');
//   const statArray = Object.entries(res.data);
//   const filteredArray = statArray.filter(
//     stat => stat[1].All.abbreviation !== undefined
//   );
//   const paths = filteredArray.map(stat => ({
//     params: { id: stat[1].All.abbreviation }
//   }));
//   return { paths, fallback: false };
// }
