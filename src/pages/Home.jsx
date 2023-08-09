import { Container, Link, Pagination, Stack, Typography } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import Searchbar from '../components/Searchbar';
import CountryCard from '../components/CountryCard';
import { CountriesContext } from '../CountriesContext';
import pagination from '../pagination';

export default function Home() {
  const { countries, loading } = useContext(CountriesContext);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isFilteredByUnMember, setIsFilteredByUnMember] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [searchText, setSearchText] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 20;

  const filterMenuFunc = (country) => {
    if (selectedRegion) return country.region === selectedRegion;
    if (isFilteredByUnMember) return country.unMember === true;
    if (country.name.common === 'Antarctica') return false; // not a country
    return true;
  };
  const searchFilterFunc = (country) => {
    // if there's nothing typed
    if (searchText.length === 0) return country;
    let matchArray = true;
    if (/^([A-Z])+$/gi.test(searchText)) {
      // only create a regex after making sure all characters are valid (not [](){})
      const regex = new RegExp(searchText, 'i');
      matchArray = country.name.common.match(regex);
    }
    return matchArray;
  };
  const sortFunc = (a, b) => {
    if (sortBy === 'Name') return a.name.common > b.name.common;
    if (sortBy === 'Population') return a.population < b.population;
    if (sortBy === 'Area') return a.area < b.area;
    return undefined;
  };
  const countriesToBeRendered = useMemo(
    () => countries.filter(filterMenuFunc).filter(searchFilterFunc).sort(sortFunc),
    [countries, currentPage, filterMenuFunc, searchFilterFunc, sortFunc],
  );

  const pages = pagination(countriesToBeRendered, cardsPerPage);
  const countryCards = useMemo(() => {
    if (pages.length === 0) return [];
    return pages[currentPage - 1].map((countryObj) => (
      <CountryCard
        commonName={countryObj.name.common}
        population={countryObj.population}
        region={countryObj.region}
        capital={countryObj.capital}
        flagImg={countryObj.flags.svg}
        searchText={searchText}
        key={nanoid()}
      />
    ));
  }, [countriesToBeRendered]);

  const pagiBar = (
    <Stack spacing={1}>
      <Typography align="center">
        Showing {Math.min(cardsPerPage, countriesToBeRendered.length)} countries out of{' '}
        {countriesToBeRendered.length}
      </Typography>
      <Pagination
        count={pages.length}
        page={currentPage}
        size="large"
        variant="outlined"
        showFirstButton
        showLastButton
        onChange={(event, page) => {
          setCurrentPage(page);
          window.scrollTo(0, 0);
        }}
        sx={{ '> ul': { justifyContent: 'center' } }}
      />
    </Stack>
  );

  const loadingMessage = useMemo(() => {
    if (loading) return <Typography align="center">Loading data from API...</Typography>;
    if (countriesToBeRendered.length === 0) {
      return <Typography align="center">Can&apos;t find any countries</Typography>;
    }
    return pagiBar;
  }, [loading, countriesToBeRendered]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginY: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        '@media (min-width: 600px)': {
          paddingLeft: '2rem',
          paddingRight: '2rem',
        },
      }}
    >
      <Searchbar
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        isFilteredByUnMember={isFilteredByUnMember}
        setIsFilteredByUnMember={setIsFilteredByUnMember}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setCurrentPage={setCurrentPage}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {loadingMessage}
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          columnGap: '3rem',
          rowGap: '3rem',
        }}
      >
        {countryCards}
      </Container>
      <Typography
        align="center"
        className="attribution"
        padding={2}
        fontSize={14}
      >
        Challenge by{' '}
        <Link
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </Link>
        . Coded by{' '}
        <Link
          href="https://github.com/Y-elv"
          target="_blank"
          rel="noreferrer"
        >
         Elvis
        </Link>
      </Typography>
    </Container>
  );
}
