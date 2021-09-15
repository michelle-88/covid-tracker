import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  iconButton: {
    '& .material-icons': {
      transition: 'transform 0.5s',
      transform: 'rotate(-45deg)'
    },
    '& .rotateIcon': {
      transform: 'rotate(-180deg)'
    }
  }
});

export default function ThemeToggle({ darkMode, updateCurrentTheme }) {
  const classes = useStyles();
  return (
    <div>
      <IconButton onClick={updateCurrentTheme} className={classes.iconButton}>
        <Icon fontSize='large' className={darkMode ? 'rotateIcon' : ''}>
          {darkMode ? 'brightness_7' : 'nightlight'}
        </Icon>
      </IconButton>
    </div>
  );
}
