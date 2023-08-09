import {
  Button,
  Menu,
  MenuItem,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import CheckIcon from '@mui/icons-material/Check';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { bool, func, string } from 'prop-types';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Searchbar({
  selectedRegion,
  setSelectedRegion,
  isFilteredByUnMember,
  setIsFilteredByUnMember,
  sortBy,
  setSortBy,
  setCurrentPage,
  searchText,
  setSearchText,
}) {
  const [filterAnchor, setFilterAnchor] = useState(null);
  const filterOpen = Boolean(filterAnchor);
  const handleFilterClick = (e) => setFilterAnchor(e.currentTarget);
  const handleFilterClose = () => setFilterAnchor(null);

  const [regionAnchor, setRegionAnchor] = useState(null);
  const regionMenuOpen = Boolean(regionAnchor);
  const handleRegionClick = (e) => setRegionAnchor(e.currentTarget);
  const handleRegionClose = () => setRegionAnchor(null);
  const selectRegion = (e) => {
    setSelectedRegion((prev) => (prev === e.target.textContent ? '' : e.target.textContent));
    setCurrentPage(1);
  };
  const handleUnMemberClick = () => {
    setIsFilteredByUnMember((prev) => !prev);
    setCurrentPage(1);
  };

  const [sortElem, setSortElem] = useState(null);
  const sortOpen = Boolean(sortElem);
  const handleSortClick = (e) => setSortElem(e.currentTarget);
  const handleSortClose = () => setSortElem(null);
  const selectSortCategory = (e) => {
    setSortBy((prev) => (prev === e.target.textContent ? '' : e.target.textContent));
    setCurrentPage(1);
  };
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((regionName) => (
    <MenuItem
      selected={selectedRegion === regionName}
      onClick={selectRegion}
      key={regionName}
    >
      {selectedRegion === regionName && (
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
      )}
      <ListItemText inset={selectedRegion !== regionName}>{regionName}</ListItemText>
    </MenuItem>
  ));

  const sortCategories = ['Name', 'Population', 'Area'].map((category) => (
    <MenuItem
      selected={sortBy === category}
      onClick={selectSortCategory}
      key={category}
    >
      {sortBy === category && (
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
      )}
      <ListItemText inset={sortBy !== category}>{category}</ListItemText>
    </MenuItem>
  ));

  const biggerThan500px = useMediaQuery((myTheme) => myTheme.breakpoints.up('sm'));

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 3, sm: 2 }}
      justifyContent="space-between"
      className="search-bar"
    >
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        className="search-field"
      >
        <TextField
          id="input-with-sx"
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ flexGrow: '1' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        className="sort-and-filter"
        justifyContent="space-between"
        sx={{
          maxWidth: biggerThan500px ? '400px' : 'auto',
          flexGrow: '1',
          ' > *': {
            flexGrow: '1',
          },
        }}
      >
        <Button
          onClick={handleSortClick}
          endIcon={<KeyboardArrowDownIcon />}
          startIcon={<SortIcon />}
          variant="outlined"
          disableRipple
          sx={{
            // width: '200px',
            '>:last-child': {
              marginLeft: 'auto',
            },
          }}
        >
          {sortBy ? `Sort By: ${sortBy}` : 'Sort By'}
        </Button>
        <Menu
          anchorEl={sortElem}
          open={sortOpen}
          onClose={handleSortClose}
        >
          {sortCategories}
        </Menu>
        <Button
          onClick={handleFilterClick}
          endIcon={<KeyboardArrowDownIcon />}
          startIcon={<FilterAltIcon />}
          variant="outlined"
          disableRipple
          sx={{
            // width: '200px',
            '>:last-child': {
              marginLeft: 'auto',
            },
          }}
        >
          {selectedRegion ? `Region: ${selectedRegion}` : 'Filter By'}
        </Button>
        <Menu
          open={filterOpen}
          anchorEl={filterAnchor}
          onClose={handleFilterClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          className="filterMenu"
        >
          <MenuItem onClick={handleRegionClick}>
            <ListItemText inset>Region</ListItemText>
            <ChevronRightIcon />
          </MenuItem>
          <MenuItem onClick={handleUnMemberClick}>
            {isFilteredByUnMember && (
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
            )}
            <ListItemText inset={!isFilteredByUnMember}>UN Member</ListItemText>
          </MenuItem>
        </Menu>
        <Menu
          open={regionMenuOpen}
          anchorEl={regionAnchor}
          onClose={handleRegionClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          className="regions"
        >
          {regions}
        </Menu>
      </Stack>
    </Stack>
  );
}

Searchbar.propTypes = {
  selectedRegion: string.isRequired,
  setSelectedRegion: func.isRequired,
  isFilteredByUnMember: bool.isRequired,
  setIsFilteredByUnMember: func.isRequired,
  sortBy: string.isRequired,
  setSortBy: func.isRequired,
  setCurrentPage: func.isRequired,
  searchText: string.isRequired,
  setSearchText: func.isRequired,
};
