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
      padding: '20px'
    },
    '& .MuiSvgIcon-root': {
      marginLeft: '2px'
    }
  },
  row: {
    display: 'flex',
    padding: '20px',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    borderRadius: '6px',
    boxShadow:
      'rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px',
    // boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
    transition: 'transform 200ms ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)'
    }
  },
  country: {
    flex: 1,
    textAlign: 'left'
  },
  confirmed: {
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
  if (value === 'country') {
    switch (direction) {
      case 'asc':
        return [...countries].sort((a, b) => (a[0] > b[0] ? 1 : -1));
      case 'desc':
        return [...countries].sort((a, b) => (a[0] > b[0] ? -1 : 1));
      default:
        return countries;
    }
  }
  switch (direction) {
    case 'asc':
      return [...countries].sort((a, b) =>
        a[1].All[value] > b[1].All[value] ? 1 : -1
      );
    case 'desc':
      return [...countries].sort((a, b) =>
        a[1].All[value] > b[1].All[value] ? -1 : 1
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
  console.log(statArray);
  return (
    <div>
      <div className={classes.tableHeader}>
        <Button onClick={() => setFilterValueAndDirection('country')}>
          Country {value === 'country' && <SortArrow direction={direction} />}
        </Button>
        <Button onClick={() => setFilterValueAndDirection('confirmed')}>
          Confirmed Cases{' '}
          {value === 'confirmed' && <SortArrow direction={direction} />}
        </Button>
        <Hidden xsDown>
          <Button onClick={() => setFilterValueAndDirection('recovered')}>
            Recovered{' '}
            {value === 'recovered' && <SortArrow direction={direction} />}
          </Button>
          <Button onClick={() => setFilterValueAndDirection('deaths')}>
            Deaths {value === 'deaths' && <SortArrow direction={direction} />}
          </Button>
        </Hidden>
      </div>

      {orderedCountries.map(stat => (
        <Link
          key={stat[0]}
          href={`/country/${stat[1].All.abbreviation}`}
          passHref
        >
          <Card className={classes.row}>
            <div className={classes.country}>
              <Typography>{stat[0]}</Typography>
            </div>
            <div className={classes.confirmed}>
              <Typography>{stat[1].All.confirmed}</Typography>
            </div>
            <Hidden xsDown>
              <div className={classes.recovered}>
                <Typography>{stat[1].All.recovered}</Typography>
              </div>
              <div className={classes.deaths}>
                <Typography>{stat[1].All.deaths}</Typography>
              </div>
            </Hidden>
          </Card>
        </Link>
      ))}
    </div>
  );
}
