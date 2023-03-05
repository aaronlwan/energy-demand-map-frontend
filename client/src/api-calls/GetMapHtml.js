export async function GetMapHtml(lat, lon, r, city, state)  {
    const params = {
        'method': 'GET',
    }
    let response = await fetch('http://127.0.0.1:5000/latlontomap?' + new URLSearchParams({
        "lat": lat,
        "lon": lon,
        "r": r,
        "city": city,
        "state": state
    }), params);
    const result = response.json();
    return result;
}