import { useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  tableHeader: {
    display: 'flex',
    '& button': {
      flex: 1,
      padding: '20px',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2, 1, 2, 1)
      },
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2, 0, 2, 0)
      }
    },
    '& .MuiSvgIcon-root': {
      marginLeft: '2px'
    }
  },
  link: {
    textDecoration: 'none'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    borderRadius: '6px',
    boxShadow:
      'rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px',
    transition: 'transform 200ms ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)'
    }
  },
  country: {
    flex: 1,
    textAlign: 'left'
  },
  active: {
    flex: 1
  },
  recovered: {
    flex: 1
  },
  deaths: {
    flex: 1
  }
}));

const orderBy = (countries, direction, value) => {
  if (value === 'TotalRecovered') {
    switch (direction) {
      case 'asc':
        return [...countries].sort((a, b) =>
          parseInt(a[1].TotalRecovered) > parseInt(b[1].TotalRecovered) ? 1 : -1
        );
      case 'desc':
        return [...countries].sort((a, b) =>
          parseInt(a[1].TotalRecovered) > parseInt(b[1].TotalRecovered) ? -1 : 1
        );
      default:
        return countries;
    }
  }
  switch (direction) {
    case 'asc':
      return [...countries].sort((a, b) =>
        a[1][value] > b[1][value] ? 1 : -1
      );
    case 'desc':
      return [...countries].sort((a, b) =>
        a[1][value] > b[1][value] ? -1 : 1
      );
    default:
      return countries;
  }
};

const SortArrow = ({ direction }) => {
  if (!direction) return <></>;
  if (direction === 'desc')
    return <KeyboardArrowDownRoundedIcon color='secondary' />;
  else return <KeyboardArrowUpRoundedIcon color='secondary' />;
};

export default function DataTable({ statArray }) {
  const classes = useStyles();
  const [direction, setDirection] = useState(null);
  const [value, setValue] = useState(null);

  const orderedCountries = orderBy(statArray, direction, value);

  const changeDirection = () => {
    if (!direction) setDirection('desc');
    else if (direction === 'desc') setDirection('asc');
    else setDirection(null);
  };
  const setFilterValueAndDirection = val => {
    changeDirection();
    setValue(val);
  };

  return (
    <div>
      <div className={classes.tableHeader}>
        <Button onClick={() => setFilterValueAndDirection('Country')}>
          Country {value === 'Country' && <SortArrow direction={direction} />}
        </Button>
        <Button onClick={() => setFilterValueAndDirection('ActiveCases')}>
          Active Cases{' '}
          {value === 'ActiveCases' && <SortArrow direction={direction} />}
        </Button>
        <Hidden xsDown>
          <Button onClick={() => setFilterValueAndDirection('TotalRecovered')}>
            Total Recovered{' '}
            {value === 'TotalRecovered' && <SortArrow direction={direction} />}
          </Button>
          <Button onClick={() => setFilterValueAndDirection('TotalDeaths')}>
            Total Deaths{' '}
            {value === 'TotalDeaths' && <SortArrow direction={direction} />}
          </Button>
        </Hidden>
      </div>

      {orderedCountries.map(stat => (
        <Link
          key={stat[1].id}
          href={`/${stat[1].Country}/${stat[1].ThreeLetterSymbol}`}
          passHref
        >
          <a className={classes.link}>
            <Card className={classes.row}>
              <div className={classes.country}>
                <Typography>{stat[1].Country}</Typography>
              </div>
              <div className={classes.active}>
                <Typography>
                  {stat[1].ActiveCases.toLocaleString('en-US')}
                </Typography>
              </div>
              <Hidden xsDown>
                <div className={classes.recovered}>
                  <Typography>
                    {parseInt(stat[1].TotalRecovered).toLocaleString('en-US')}
                  </Typography>
                </div>
                <div className={classes.deaths}>
                  <Typography>
                    {stat[1].TotalDeaths.toLocaleString('en-US')}
                  </Typography>
                </div>
              </Hidden>
            </Card>
          </a>
        </Link>
      ))}
    </div>
  );
}
