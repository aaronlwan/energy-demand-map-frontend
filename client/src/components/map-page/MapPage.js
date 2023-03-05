import { React, useState} from 'react';
import { GetMapHtml } from '../../api-calls/GetMapHtml';
import { GetLatLon } from '../../api-calls/GetLatLon';
import states from '../../statecodes.json';

const MapPage = () => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapHtml, setMapHtml] = useState("Loading map...");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const stateCodes = Object.keys(states);

    const onSubmit = () => {
        const latLonData = GetLatLon(city, state, "US");
        latLonData.then((res)=>{
            const mapData = GetMapHtml(res.lat, res.lon, 1000);
            mapData.then((res) => {
            setMapHtml(res.html);
            })
            setMapLoaded(true);
        })
    }

    const Map = (props) => {
        const loaded = props.loaded;
        if (loaded) {
            return (
            <div dangerouslySetInnerHTML={{__html: mapHtml}}/>
            )
        } else {
            return (
            "Map Placeholder"
            )
        }
    }

    return (
    <div className="App">
        <div className="input-wrapper">
        <label>City:</label>
        <input className="city-input" value={city} onChange={({target})=> {setCity(target.value)}}/>
        <label>State:</label>
        <select className="state-input" value={state} onChange={({target}) =>{setState(target.value)}}>
            <option></option>
            {stateCodes.map((code) => <option key={code}>{code}</option>)}
        </select>
        <div className="submit-button" onClick={onSubmit}>GoSolar!</div>
        </div>
        <div className="map-wrapper">
        <Map loaded={mapLoaded}/>
        </div>
    </div>
    );
}

export default MapPage;