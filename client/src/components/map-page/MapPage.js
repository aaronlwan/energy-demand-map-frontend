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
  } from '@chakra-ui/react';

const MapPage = () => {
    const params = useParams();
    const inputLatitude = params.lat;
    const inputLongitude = params.lon;
    const inputRadius = params.rad;
    const inputState = params.state;
    const inputCity = params.city;
    const stateCodes = Object.keys(states);
    const [mapHtml, setMapHtml] = useState("");
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
          return (
            <Navigate to={`/site-sourcing-map/${lat}/${lon}/${radius}/${city}/${state}`}/>
          )
        }
    }

    if (mapLoaded) {
        console.log(mapHtml)
        return (
            <div>
                <HStack spacing={3}>
                    <Input variant='outline' placeholder={inputCity} value={city} onChange={({target})=> {setCity(target.value)}} />
                    <Select placeholder={inputState} value={state} onChange={({target})=> {setState(target.value)}} >
                        {stateCodes.map((code) => <option key={code}>{code}</option>)}
                    </Select>
                    <Input variant='outline' placeholder='Capture Radius' value={radius} onChange={({target})=> {setRadius(target.value)}} />
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
                <div className='map-wrapper'>
                    <div dangerouslySetInnerHTML={{__html: mapHtml}}/>
                </div>
            </div>
        )
    } else {
        const mapCall = GetMapHtml(inputLatitude, inputLongitude, inputRadius);
        console.log(mapCall)
        mapCall.then((res) => {
            setMapHtml(res.map_html);
            console.log(mapHtml);
            setMapLoaded(true);
        })
        return (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#FE6700"
              size="xl"
            />
        )
    }
}

export default MapPage;