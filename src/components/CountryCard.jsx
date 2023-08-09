import { Typography, Box, Card, CardActionArea, CardContent } from '@mui/material';
import { array, number, oneOfType, string } from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import addSuffix from '../addSuffix';
import toKebabCase from '../toKebabCase';
import HighlightMatch from './HighlightMatch';

export default function CountryCard({
  commonName,
  population,
  region,
  capital,
  flagImg,
  searchText,
}) {
  return (
    <Card
      elevation={6}
      sx={{ minWidth: '240px' }}
      className="countryCard"
    >
      <CardActionArea
        component={RouterLink}
        to={`/countries/${toKebabCase(commonName)}`}
      >
        <CardContent sx={{ padding: '0' }}>
          <img
            src={flagImg}
            alt={`${commonName}'s flag`}
          />
          <Box sx={{ padding: '1.5rem' }}>
            <HighlightMatch
              countryName={commonName}
              searchText={searchText}
            />
            <Typography>
              <Typography
                component="span"
                sx={{ fontWeight: '600', display: 'inline-block' }}
              >
                Capital:
              </Typography>{' '}
              {capital}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{ fontWeight: '600', display: 'inline-block' }}
              >
                Region:
              </Typography>{' '}
              {region}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{ fontWeight: '600', display: 'inline-block' }}
              >
                Population:
              </Typography>{' '}
              {addSuffix(population)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

CountryCard.propTypes = {
  commonName: string.isRequired,
  population: number.isRequired,
  region: string.isRequired,
  capital: oneOfType([string, array]),
  flagImg: string.isRequired,
  searchText: string.isRequired,
};

CountryCard.defaultProps = { capital: undefined };
