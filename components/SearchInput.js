import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  input: {
    width: '50%',
    height: '100%',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

export default function SearchInput({ onChange }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <TextField
        id='search-input'
        onChange={onChange}
        placeholder='Search by Country, Region, or Continent'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
        variant='outlined'
        className={classes.input}
      />
    </div>
  );
}
