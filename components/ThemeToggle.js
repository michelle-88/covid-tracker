import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({}));

export default function ThemeToggle({ darkMode, updateCurrentTheme }) {
  const classes = useStyles();
  return (
    <div>
      <IconButton onClick={updateCurrentTheme}>
        <Icon fontSize='large'>
          {darkMode ? 'brightness_7' : 'nights_stay'}
        </Icon>
      </IconButton>
    </div>
  );
}
