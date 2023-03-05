import { React, useState} from 'react';
import { GetMapHtml } from '../../api-calls/GetMapHtml';
import { GetLatLon } from '../../api-calls/GetLatLon';
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import states from '../../statecodes.json';
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    Image,
    Center,
    Spinner,
    HStack,
    Input,
    Select,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Flex,
  } from '@chakra-ui/react';
  import { Card, CardHeader, CardBody, CardFooter, StackDivider, } from '@chakra-ui/react'

const MapPage = () => {
    const params = useParams();
    const inputLatitude = params.lat;
    const inputLongitude = params.lon;
    const inputRadius = params.rad;
    const inputState = params.state;
    const inputCity = params.city;
    const stateCodes = Object.keys(states);

    const [mapHtml, setMapHtml] = useState("");
    const [demand, setDemand] = useState("");
    const [existingInstalls, setExistingInstalls] = useState("");
    const [countQualified, setCountQualified] = useState("");
    const [totalKwhPotential, setTotalKwhPotential] = useState("");
    const [medianKwhPotential, setMedianKwhPotential] = useState("");
    const [numBuildings, setNumBuildings] = useState("");
    const [potentialProduction, setPotentialProduction] = useState("");
    const [numSites, setNumSites] = useState("");
    const [mapLoaded, setMapLoaded] = useState(false);
    
    const [state, setState] = useState(inputState);
    const [city, setCity] = useState(inputCity);
    const [radius, setRadius] = useState(inputRadius);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");

    const [latLonLoaded, setLatLonLoaded] = useState(false);

    if (buttonClicked) {
        const latLonData = GetLatLon(city, state, "US");
        latLonData.then((res)=> {
           setLat(res.lat);
           setLon(res.lon);
           setLatLonLoaded(true);
        })
    }

    if (latLonLoaded) {
        setButtonClicked(false);
        setMapLoaded(false);
        setLatLonLoaded(false);
        return (
          <Navigate to={`/site-sourcing-map/${lat}/${lon}/${radius}/${city}/${state}`}/>
        )
    }

    if (mapLoaded) {
        console.log(mapHtml)
        return (
            <Stack spacing="20px" marginTop={3}>
                <HStack spacing={3} alignItems='flex-start'>
                    <div style={{width: 3000}}dangerouslySetInnerHTML={{__html: mapHtml}}/>
                    <Stack>
                    <Card variant="outline">
                        <CardHeader>
                            <Heading size='md'>Report</Heading>
                        </CardHeader>

                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                ESTIMATED ENERGY DEMAND
                                </Heading>
                                <Text pt='6' fontSize='md'>
                                    Our model projects that your city will require <b>{Math.round(demand)}</b> KWh of energy each year.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                ROOFTOP AVAILABILITY
                                </Heading>
                                <Text pt='6' fontSize='md'>
                                    Out of the <b>{numBuildings}</b> buildings in your city, <b>{countQualified}</b> of them may be suitable for rooftop installation. <b>{countQualified - existingInstalls}</b> of them have yet to adopt solar rooftops.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                POTENTIAL GROUND SITES
                                </Heading>
                                <Text pt='6' fontSize='md'>
                                    We've identified <b>{numSites}</b> potential ground sites for solar projects. These include brownfields, landfills, and greenlands. We've marked the top 10% sites based on energy production potential and proximity to the existing power grid.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                TOTAL ADDED SOLAR POTENTIAL
                                </Heading>
                                <Text pt='6' fontSize='md'>
                                    Altogether, these projects could provide <b>{Math.round(potentialProduction + (countQualified - existingInstalls) * medianKwhPotential)}</b> KWh of energy per year, meeting <b>{Math.round((Math.round(potentialProduction + (countQualified - existingInstalls) * medianKwhPotential))/Math.round(demand)*100)}%</b> your city's yearly energy needs.
                                </Text>
                            </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                    </Stack>
                </HStack>
            </Stack>
        )
    } else {
        const mapCall = GetMapHtml(inputLatitude, inputLongitude, inputRadius, inputCity, inputState);
        console.log(mapCall)
        mapCall.then((res) => {
            setMapHtml(res.map_html);
            setDemand(res.demand);
            setExistingInstalls(res.existing_installs);
            setCountQualified(res.count_qualified);
            setTotalKwhPotential(res.total_kwh_potential);
            setMedianKwhPotential(res.median_kwh_potential);
            setNumBuildings(res.number_buildings);
            setPotentialProduction(res.potential_production);
            setNumSites(res.number_sites);
            console.log(mapHtml);
            setMapLoaded(true);
        })
        return (
          <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
            <Center>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#FE6700"
                    size="xl"
                    alignItems="center"
                    alignSelf="center"
                />
            </Center>
          </Flex>
        )
    }
}

export default MapPage;