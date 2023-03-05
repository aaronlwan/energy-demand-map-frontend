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
    
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [radius, setRadius] = useState(5000);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");

    console.log(inputLatitude)
    console.log(inputLongitude)

    if (buttonClicked) {
        const latLonData = GetLatLon(city, state, "US");
        latLonData.then((res)=> {
           setLat(res.lat);
           setLon(res.lon);
        })
        if (lat !== "" && lon !== "") {
          setButtonClicked(false);
          setMapLoaded(false);
          return (
            <Navigate to={`/site-sourcing-map/${lat}/${lon}/${radius}/${city}/${state}`}/>
          )
        }
    }

    if (mapLoaded) {
        console.log(mapHtml)
        return (
            <Stack spacing="20px">
                <HStack spacing={5}>
                    <Input width='200' variant='outline' placeholder={inputCity} value={city} onChange={({target})=> {setCity(target.value)}} />
                    <Select width='200' placeholder={inputState} value={state} onChange={({target})=> {setState(target.value)}} >
                        {stateCodes.map((code) => <option key={code}>{code}</option>)}
                    </Select>
                    <Input width='200' variant='outline' placeholder='Capture Radius' value={radius} onChange={({target})=> {setRadius(target.value)}} />
                    <Button
                        colorScheme={'green'}
                        bg={'#FE6700'}
                        rounded={'full'}
                        px={6}
                        _hover={{
                        bg: '#C56700',
                        }}
                        onClick={() => setButtonClicked(true)}
                    >
                    Let's Go Solar
                    </Button>
                </HStack>
                <HStack spacing={3} alignItems='flex-start'>
                    <div style={{width: 1500}}dangerouslySetInnerHTML={{__html: mapHtml}}/>
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
                                <Text pt='2' fontSize='sm'>
                                View a summary of all your clients over the last month.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                ROOFTOP AVAILABILITY
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                Check out the overview of your clients.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                OPEN GROUND SITES
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                See a detailed analysis of all your business clients.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                TOTAL SOLAR POTENTIAL
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                See a detailed analysis of all your business clients.
                                </Text>
                            </Box>
                            </Stack>
                        </CardBody>
                    </Card>
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