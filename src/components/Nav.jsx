import {
  useTheme, AppBar, Button, Link, Toolbar, Typography, IconButton,
} from '@mui/material';
import { string, func } from 'prop-types';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link as RouterLink } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Nav({ theme, setTheme }) {
  const appBarBg = useTheme().palette.background.default;
  const appBarText = useTheme().palette.text.primary;
  const biggerThan500px = useMediaQuery((myTheme) => myTheme.breakpoints.up('sm'));

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: appBarBg, color: appBarText }}
    >
      <Toolbar
        sx={{
          marginX: { xs: '1rem', sm: '3rem' },
          padding: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <Link
          component={RouterLink}
          to="/"
          variant="h6"
          underline="hover"
          sx={{
            fontWeight: '800',
            letterSpacing: '-0.5px',
            lineHeight: '110%',
            marginRight: 'auto',
          }}
        >
          Where in the world?
        </Link>
        {biggerThan500px ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setTheme((prev) => (prev === 'Light' ? 'Dark' : 'Light'))}
            startIcon={theme === 'Light' ? <DarkModeIcon /> : <LightModeIcon />}
          >
            <Typography
              component="span"
              sx={{ fontSize: '0.85rem' }}
            >
              {theme === 'Light' ? 'Dark' : 'Light'} Mode
            </Typography>
          </Button>
        ) : (
          <IconButton
            aria-label="switch theme button"
            onClick={() => setTheme((prev) => (prev === 'Light' ? 'Dark' : 'Light'))}
          >
            {theme === 'Light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

Nav.propTypes = {
  theme: string.isRequired,
  setTheme: func.isRequired,
};
