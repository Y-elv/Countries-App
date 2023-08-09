import { Typography, useTheme } from '@mui/material';
import { string } from 'prop-types';

export default function HighlightMatch({ countryName, searchText }) {
  const highlightColor = useTheme().palette.info.main;

  const regex = new RegExp(searchText, 'gi');
  const normalOnes = countryName.split(regex).map((n) => (
    <Typography
      component="span"
      fontSize="inherit"
      fontWeight="inherit"
    >
      {n}
    </Typography>
  ));

  const matches = countryName.match(regex)
    ? countryName.match(regex).map((n) => (
      <Typography
        component="span"
        fontSize="inherit"
        fontWeight="inherit"
        style={{ backgroundColor: highlightColor }}
      >
        {n}
      </Typography>
    ))
    : [];

  const spans = [];
  for (let i = 0; i < Math.max(normalOnes.length, matches.length); i += 1) {
    spans.push(normalOnes[i], matches[i]);
  }

  return (
    <Typography
      variant="h5"
      paragraph
      sx={{ fontWeight: '800' }}
    >
      {spans}
    </Typography>
  );
}

HighlightMatch.propTypes = {
  countryName: string.isRequired,
  searchText: string.isRequired,
};
