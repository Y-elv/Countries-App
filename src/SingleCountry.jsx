import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Center,
  GridItem,
  Image,
  Progress,
  SimpleGrid,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Nav from "./Navlink";

function SingleCountry() {
  let { countryname } = useParams();
  const [data, setData] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${countryname}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("Error:", err.message));
  }, [countryname]);

  return (
    <div>
      <Nav />

      <Box onClick={() => navigate(-1)} p={'10'}  >
        <Button size="lg" variant="solid" mr="3">
          Back
        </Button>
      </Box>

      {data === undefined || data === null ? (
        <Progress colorScheme="pink" size="xs" isIndeterminate />
      ) : (
        data?.map((x) => {
          return (
            <Center key={x?.name?.common} >
              <SimpleGrid
                columns={[1, null, 2]}
                spacing={100}
                pt="100"
                pr="50"
                pl="50"
              >
                <GridItem w="100%">
                  <Image src={x?.flags?.svg} alt={x?.Region} height="350" />
                </GridItem>
                <GridItem w="100%">
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                  >
                    {x?.name?.common}
                  </Box>

                  <SimpleGrid columns={2} spacing={10}>
                    <Box>Native Name: {x?.name?.common}</Box>
                    <Box>Top Level Domain: {x?.tld[0]}</Box>
                  </SimpleGrid>

                  <SimpleGrid columns={2} spacing={10}>
                    <Box>Population: {x?.population}</Box>
                    <Box>
                      Currencies:{" "}
                      {x?.currencies[Object?.keys(x?.currencies)[0]]?.name}
                    </Box>
                  </SimpleGrid>

                  <SimpleGrid columns={2} spacing={10}>
                    <Box>Region: {x?.region}</Box>
                    <Box>
                      Language(s): {x?.languages[Object.keys(x?.languages)[0]]}
                    </Box>
                  </SimpleGrid>

                  <SimpleGrid columns={2} spacing={10}>
                    <Box>Subregion: {x?.subregion}</Box>
                  </SimpleGrid>

                  <SimpleGrid columns={2} spacing={10}>
                    <Box>Capital: {x?.capital}</Box>
                  </SimpleGrid>

                  <SimpleGrid mt="50" columns={2} spacing={10}>
                    <Box>Border Countries:</Box>

                    <Box>
                      {x?.borders?.map((x) => (
                        <Button
                          onClick={() => navigate(`/singlecountry/${x}`)}
                          size="lg"
                          key={x}
                          variant="solid"
                          mr="3"
                        >
                          {x}
                        </Button>
                      ))}
                    </Box>
                  </SimpleGrid>
                </GridItem>
              </SimpleGrid>
            </Center>
          );
        })
      )}
    </div>
  );
}

export default SingleCountry;
