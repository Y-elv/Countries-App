import { useContext } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  Divider, Button, Container, Grid, Link, Stack, Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CountriesContext } from '../CountriesContext';
import addSuffix from '../addSuffix';
import toKebabCase from '../toKebabCase';

export default function CountryPage() {
  const params = useParams();
  const { countries } = useContext(CountriesContext);
  const found = countries.find(
    (country) => toKebabCase(country.name.common) === toKebabCase(params.name),
  );

  const borderCountriesLinks = found.borders
    ? found.borders.map((cca3) => {
      const countryObj = countries.find((country) => country.cca3 === cca3);
      return (
        <Button
          to={`/countries/${toKebabCase(countryObj.name.common)}`}
          component={RouterLink}
          variant="outlined"
          sx={{ mr: '0.5rem', mb: '1rem' }}
          title={countryObj.name.common}
        >
          <img
            src={countryObj.flags.png}
            alt=""
            className="bordering-country"
          />
          {cca3}
        </Button>
      );
    })
    : 'None';
  const nav = useNavigate();

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginY: '2rem',
      }}
      className="countryPage"
    >
      <Button
        onClick={() => nav('/')}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
      >
        Back to Countries
      </Button>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={6}
        sx={{
          marginTop: '2rem',
          '> *': {
            flexGrow: '1',
          },
        }}
      >
        <Grid
          item
          xs={12}
          sm={5}
        >
          <img
            src={found.flags.svg}
            alt={`${found.name.common}'s flag`}
          />
        </Grid>
        <Grid
          item
          xs
          sm
        >
          <Stack spacing={2}>
            <Typography
              component="h1"
              variant="h3"
            >
              {found.name.common} <Typography component="span" />
            </Typography>
            <Stack spacing={4}>
              <Stack
                direction={{ md: 'column', lg: 'row' }}
                spacing={{ sm: 1, md: 2, lg: 4 }}
                divider={(
                  <Divider
                    orientation="vertical"
                    flexItem
                  />
                )}
              >
                <Stack spacing={1}>
                  <Typography>
                    <Typography
                      component="span"
                      sx={{ fontWeight: '600', display: 'inline-block' }}
                    >
                      Native Name:
                    </Typography>{' '}
                    {Object.values(Object.values(found.name.nativeName)[0])[0]}
                  </Typography>
                  <Typography>
                    <Typography
                      component="span"
                      sx={{ fontWeight: '600', display: 'inline-block' }}
                    >
                      Population:
                    </Typography>{' '}
                    {addSuffix(found.population)}
                  </Typography>
                  <Typography>
                    <Typography
                      component="span"
                      sx={{ fontWeight: '600', display: 'inline-block' }}
                    >
                      Region:
                    </Typography>{' '}
                    {found.region}
                  </Typography>
                  <Typography>
                    <Typography
                      component="span"
                      sx={{ fontWeight: '600', display: 'inline-block' }}
                    >
                      Subregion:
                    </Typography>{' '}
                    {found.subregion}
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  <Typography>
                    <Typography
                      component="span"
                      sx={{ fontWeight: '600', display: 'inline-block' }}
                    >
                      Top Level Domain:
                    </Typography>{' '}
                    {found.tld[0]}
                  </Typography>
                  <Typography component="pre">
                    <Typography
                      component="span"
                      sx={{ fontWeight: '600', display: 'inline-block' }}
                    >
                      Currencies:
                    </Typography>{' '}
                    {Object.keys(found.currencies)[0]}
                  </Typography>
                  <Typography>
                    <Typography
                      component="span"
                      sx={{ fontWeight: '600', display: 'inline-block' }}
                    >
                      Language:
                    </Typography>{' '}
                    {Object.values(found.languages)[0]}
                  </Typography>
                  <Typography>
                    <Typography
                      component="span"
                      sx={{ fontWeight: '600', display: 'inline-block' }}
                    >
                      Capital:
                    </Typography>{' '}
                    {found.capital[0]}
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing="1">
                <Typography>
                  <Typography
                    component="span"
                    sx={{ fontWeight: '600', display: 'inline-block' }}
                  >
                    Bordering countries:
                  </Typography>{' '}
                  {borderCountriesLinks}
                </Typography>
                <Link
                  href={found.maps.googleMaps}
                  target="_blank"
                >
                  Google Maps
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
