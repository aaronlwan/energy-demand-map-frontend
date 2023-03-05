import { React, useState} from 'react';
import { GetMapHtml } from '../../api-calls/GetMapHtml';
import { GetLatLon } from '../../api-calls/GetLatLon';
import { useParams } from "react-router-dom";
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
    const [mapHtml, setMapHtml] = useState("");
    const [mapLoaded, setMapLoaded] = useState(false);
    
    const mapCall = GetMapHtml(inputLatitude, inputLongitude, inputRadius);
    mapCall.then((res) => {
        setMapHtml(res.map_html);
        console.log(mapHtml);
        setMapLoaded(true);
    })

    if (mapLoaded) {
        return (
            "This will be the map"
        )
    } else {
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