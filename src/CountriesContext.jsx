import { node } from 'prop-types';
import { createContext, useState, useEffect, useMemo } from 'react';

export const CountriesContext = createContext();

export default function CountriesContextProvider({ children }) {
  // loading data
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState(JSON.parse(localStorage.getItem('countries')) || []);
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      });
  }, []);

  const passedVals = useMemo(
    () => ({ countries, setCountries, loading, setLoading }),
    [countries, setCountries],
  );

  return <CountriesContext.Provider value={passedVals}>{children}</CountriesContext.Provider>;
}

CountriesContextProvider.propTypes = {
  children: node.isRequired,
};
